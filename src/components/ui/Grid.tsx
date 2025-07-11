export function Grid({
  children,
  cols = 3,
  gap = "gap-4",
  className = "",
}: {
  children: React.ReactNode;
  cols?: number;
  gap?: string;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols} ${gap} ${className}`}
    >
      {children}
    </div>
  );
}
