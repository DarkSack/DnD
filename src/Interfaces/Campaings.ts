interface Room {
  id: string;
  name: string;
  gameSystem: string;
  genre: string;
  currentPlayers: number;
  maxPlayers: number;
  isPrivate: boolean;
  gameMaster: string;
  description: string;
  nextSession: string;
  status: string;
  difficulty: string;
  duration: string;
  createdAt: string;
}

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

interface SelectOption {
  value: string;
  label: string;
}
interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}
interface TextareaFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}

interface NumberFieldProps {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface SectionProps {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  className?: string;
}

interface CreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAI: () => void;
  loading: boolean;
}

interface ToggleFieldProps {
  label: string;
  id: string;
  value: boolean;
  onChange: (checked: boolean) => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
export type {
  InputFieldProps,
  SelectOption,
  SelectFieldProps,
  TextareaFieldProps,
  NumberFieldProps,
  SectionProps,
  CreationModalProps,
  ToggleFieldProps,
  Room,
};
