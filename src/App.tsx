// components/Layout.tsx (o donde quieras usar el sidebar)
import React from "react";
import { Sidebar } from "./components/ui/Sidebar";
import { SidebarItem } from "./components/ui/SidebarItem";
import { SidebarGroup } from "./components/ui/SidebarGroup";
import { Home, User, BookOpen, MessageCircle, UserPlus } from "lucide-react";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
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
      </Sidebar>

      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
