import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarContext } from "./useSidebar";

type SidebarProps = {
  children: React.ReactNode;
  className?: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <aside
        className={cn(
          "relative bg-gray-900 text-white transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-white",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        <div className="flex h-full flex-col border-r border-white/10 dark:border-gray-700">
          <div className="mt-16 flex flex-1 flex-col overflow-y-auto px-2">
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="mr-8 absolute -right-3 top-4 z-10 rounded-full bg-gray-800 p-1 shadow-md dark:hover:bg-gray-700 transition-colors"
            >
              {collapsed ? (
                <ChevronRight size={24} />
              ) : (
                <ChevronLeft size={24} />
              )}
            </button>
            {children}
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};
