import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AuthState,
  AuthStore,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ApiResponse,
  User,
} from "../Interfaces/Auth";

// Configuración de la API - ajusta según tu backend
const API_BASE_URL =
   "http://localhost:3001/api";

// Configuración de endpoints
const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  ME: `${API_BASE_URL}/auth/me`,
} as const;

// Estado inicial
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Store de autenticación con persistencia
const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Función para hacer login
      login: async (
        credentials: LoginCredentials
      ): Promise<ApiResponse<AuthResponse>> => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(ENDPOINTS.LOGIN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión");
          }

          const data: AuthResponse = await response.json();

          // Asumiendo que el backend devuelve { user, token }
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true, data };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error desconocido";
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Función para registrarse
      register: async (
        userData: RegisterData
      ): Promise<ApiResponse<AuthResponse>> => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(ENDPOINTS.REGISTER, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al registrarse");
          }

          const data: AuthResponse = await response.json();

          // Asumiendo que el backend devuelve { user, token }
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true, data };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error desconocido";
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Función para cerrar sesión
      logout: async (): Promise<void> => {
        const { token } = get();

        try {
          // Intentar cerrar sesión en el backend
          if (token) {
            await fetch(ENDPOINTS.LOGOUT, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }
        } catch (error) {
          console.error("Error al cerrar sesión en el servidor:", error);
        } finally {
          // Limpiar estado local independientemente del resultado del servidor
          set({
            ...initialState,
          });
        }
      },

      // Función para obtener datos del usuario actual
      getCurrentUser: async (): Promise<User | null> => {
        const { token } = get();

        if (!token) return null;

        set({ isLoading: true });

        try {
          const response = await fetch(ENDPOINTS.ME, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Token inválido");
          }

          const userData: { user: User } = await response.json();

          set({
            user: userData.user,
            isLoading: false,
            error: null,
          });

          return userData.user;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error desconocido";
          set({
            ...initialState,
            error: errorMessage,
          });
          return null;
        }
      },

      // Función para refrescar token
      refreshToken: async (): Promise<boolean> => {
        const { token } = get();

        if (!token) return false;

        try {
          const response = await fetch(ENDPOINTS.REFRESH, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("No se pudo refrescar el token");
          }

          const data: { token: string; user?: User } = await response.json();

          set({
            token: data.token,
            user: data.user || get().user,
            isAuthenticated: true,
          });

          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error desconocido";
          set({ ...initialState, error: errorMessage });
          return false;
        }
      },

      // Función para actualizar datos del usuario
      updateUser: (userData: Partial<User>): void => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      // Función para limpiar errores
      clearError: (): void => {
        set({ error: null });
      },

      // Función para verificar si el usuario tiene un rol específico
      hasRole: (role: string): boolean => {
        const { user } = get();
        return user?.roles?.includes(role) || user?.role === role || false;
      },

      // Función para verificar si el usuario tiene permisos específicos
      hasPermission: (permission: string): boolean => {
        const { user } = get();
        return user?.permissions?.includes(permission) || false;
      },
    }),
    {
      name: "auth-storage", // nombre para localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }), // solo persistir estos campos
    }
  )
);

// Tipo para opciones de fetch
interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Hook personalizado para interceptar requests con token
export const useApiRequest = () => {
  const { token, logout } = useAuth();

  const apiRequest = async (
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> => {
    const config: RequestOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    // Si el token es inválido, cerrar sesión automáticamente
    if (response.status === 401) {
      logout();
      throw new Error("Sesión expirada");
    }

    return response;
  };

  return apiRequest;
};

export default useAuth;
