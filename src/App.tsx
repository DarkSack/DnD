// components/Layout.tsx (o donde quieras usar el sidebar)
import React from "react";
import { Sidebar } from "./components/ui/Sidebar";
import { SidebarItem } from "./components/ui/SidebarItem";
import { SidebarGroup } from "./components/ui/SidebarGroup";
import { Home, User, BookOpen } from "lucide-react";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <SidebarGroup label="General">
          <SidebarItem icon={Home} label="Home" to="/" />
          <SidebarItem icon={User} label="Characters" to="/characters" />
        </SidebarGroup>

        <SidebarGroup label="Campaigns">
          <SidebarItem icon={BookOpen} label="Campaigns" to="/campaigns" />
        </SidebarGroup>
      </Sidebar>

      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
