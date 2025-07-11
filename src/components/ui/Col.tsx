// src/components/ui/Col.jsx
export function Col({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-2 rounded-xl bg-stone-800 border border-stone-700 ${className}`}
    >
      {children}
    </div>
  );
}
