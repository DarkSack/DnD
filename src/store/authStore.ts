import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as authApi from "../api/authApi";
import type { AuthState } from "@/Interfaces/Auth";
import { Alert, validateLogin, validateRegister } from "../utils/Functions";
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: async (credentials, navigate) => {
        if (get().user) {
          Alert({ title: "Error", text: "Ya estás logueado", icon: "error" });
          navigate("/");
          return;
        }
        if (!validateLogin(credentials)) {
          Alert({
            title: "Error",
            text: "Datos inválidos",
            icon: "error",
          });
          return;
        }
        set({ loading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });
          navigate("/");
        } catch (error: unknown) {
          Alert({
            title: "Error",
            text: error instanceof Error ? error.message : "Error desconocido",
            icon: "error",
          });
          set({
            error: error instanceof Error ? error.message : "Login error",
            loading: false,
            isAuthenticated: false,
          });
        }
      },
      register: async (credentials, navigate) => {
        if (get().user) {
          Alert({ title: "Error", text: "Ya estás logueado", icon: "error" });
          navigate("/");
          return;
        }
        if (!validateRegister(credentials)) {
          Alert({
            title: "Error",
            text: "Datos inválidos",
            icon: "error",
          });
          return;
        }
        set({ loading: true, error: null });
        try {
          const response = await authApi.register(credentials);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
          });
          navigate("/");
        } catch (error: unknown) {
          set({
            error: error instanceof Error ? error.message : "Register error",
            loading: false,
            isAuthenticated: false,
          });
        }
      },
      logout: async (navigate) => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        navigate("/auth");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
