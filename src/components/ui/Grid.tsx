const colMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

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
  const colClass = colMap[cols] || colMap[3];

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:${colClass} ${gap} ${className}`}
    >
      {children}
    </div>
  );
}
