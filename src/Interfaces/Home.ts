interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  buttonText: string;
  gradient: string;
}

interface MenuCardProps {
  item: MenuItem;
}

export type { MenuItem, MenuCardProps };
