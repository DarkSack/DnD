import { createContext, useContext } from "react";

type SidebarContextType = {
  collapsed: boolean;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside <Sidebar>");
  return context;
};

export { SidebarContext };
