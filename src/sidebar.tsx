import { AppSidebar } from "./components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <AppSidebar />
    </SidebarProvider>
  );
}

export default Sidebar;
