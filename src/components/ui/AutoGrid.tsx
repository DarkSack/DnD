export function AutoGrid({
  children,
  minItemWidth = "250px",
  gap = "gap-4",
  className = "",
}: {
  children: React.ReactNode;
  minItemWidth?: string;
  gap?: string;
  className?: string;
}) {
  return (
    <div
      className={`grid ${gap} grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))] ${className}`}
    >
      {children}
    </div>
  );
}
