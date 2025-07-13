// src/store/authStore.ts
import { create } from "zustand";
import * as authApi from "../api/authApi";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegistrationData {
  email: string;
  password: string;
  username: string;
  // Add other registration fields as needed
}

interface User {
  id: string;
  email: string;
  username: string;
  name: string; // Add this field since it's being used in the sidebar
  // Add other user fields as needed
}

// Define the store state type
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ loading: true, error: null });
    try {
      const user = await authApi.login(credentials);
      set({ user, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'An unexpected error occurred', loading: false });
    }
  },

  register: async (data: RegistrationData) => {
    set({ loading: true, error: null });
    try {
      const user = await authApi.register(data);
      set({ user, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'An unexpected error occurred', loading: false });
    }
  },

  logout: async () => {
    await authApi.logout(); // opcional si lo manejas en backend
    set({ user: null });
  },

  setUser: (user: User | null) => set({ user }),
}));
