// Definir la interfaz para los items del menú
interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  buttonText: string;
  gradient: string;
}

// Definir la interfaz de props para MenuCard
interface MenuCardProps {
  item: MenuItem;
  navigate: (path: string) => void;
}

export type { MenuItem, MenuCardProps };
