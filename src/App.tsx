import React, { useEffect } from "react";
import { Sidebar } from "./components/ui/Sidebar";
import { SidebarItem } from "./components/ui/SidebarItem";
import { SidebarGroup } from "./components/ui/SidebarGroup";
import { Home, User, BookOpen, MessageCircle, UserPlus, Settings } from "lucide-react";
import "./i18n";
import { usePreferencesStore } from "./store/userPreferencesStore";
import { useAuthStore } from "./store/authStore";
export default function App({ children }: { children: React.ReactNode }) {
  const { theme } = usePreferencesStore();
  const { user } = useAuthStore();
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);


  return (
    <div className="flex min-h-screen">
      {user && <Sidebar>
        <SidebarGroup label="General">
          <SidebarItem icon={Home} label="Inicio" to="/" />
          <SidebarItem icon={User} label="Personajes" to="/characters" />
        </SidebarGroup>

        <SidebarGroup label="Campañas">
          <SidebarItem icon={BookOpen} label="Campañas" to="/campaigns" />
        </SidebarGroup>

        <SidebarGroup label="Social">
          <SidebarItem icon={MessageCircle} label="Chats" to="/social/chats" />
          <SidebarItem icon={UserPlus} label="Agregar Amigo" to="/social/social" />
        </SidebarGroup>

        <SidebarGroup label="Configuración">
          <SidebarItem icon={Settings} label="Configuración" to="/settings" />
        </SidebarGroup>
      </Sidebar>}

      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
