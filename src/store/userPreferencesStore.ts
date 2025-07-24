// preferencesStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

type PreferencesState = {
  theme: "light" | "dark";
  language: "es" | "en";
  notifications: boolean;
  sounds: boolean;
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (lang: "es" | "en") => void;
  toggleNotifications: () => void;
  toggleSounds: () => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      theme: "light",
      language: "es",
      notifications: true,
      sounds: true,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleNotifications: () =>
        set(() => ({ notifications: !get().notifications })),
      toggleSounds: () => set(() => ({ sounds: !get().sounds })),
    }),
    {
      name: "user-preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
