// Col.tsx
import { cn } from "@/lib/utils"; // o usa clsx directamente si no tienes esta función

export function Col({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-2 rounded-xl", className)}>
      {children}
    </div>
  );
}
