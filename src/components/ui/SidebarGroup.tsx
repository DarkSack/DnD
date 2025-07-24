import React from "react";
import { useSidebar } from "./useSidebar";
import { cn } from "@/lib/utils";

type SidebarGroupProps = {
  label?: string;
  children: React.ReactNode;
  className?: string;
};

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  children,
  className,
}) => {
  const { collapsed } = useSidebar();

  return (
    <div className={cn("mb-4", className)}>
      {!collapsed && label && (
        <div className="mb-1 px-3 text-xs font-semibold uppercase text-gray-400 tracking-wide">
          {label}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
};
