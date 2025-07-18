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

// Definir la interfaz de props para InputField
interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

// Definir la interfaz para una opción de select
interface SelectOption {
  value: string;
  label: string;
}

// Definir la interfaz de props para SelectField
interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}

// Definir la interfaz de props para TextareaField
interface TextareaFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}

// Definir la interfaz de props para NumberField
interface NumberFieldProps {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

// Definir la interfaz de props para Section
interface SectionProps {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  className?: string;
}

// Definir la interfaz de props para CreationModal
interface CreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAI: () => void;
  loading: boolean;
}

// Definir la interfaz de props para ToggleField
interface ToggleFieldProps {
  label: string;
  id: string;
  value: boolean;
  onChange: (checked: boolean) => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
export type { InputFieldProps, SelectOption, SelectFieldProps, TextareaFieldProps, NumberFieldProps, SectionProps, CreationModalProps, ToggleFieldProps, Room };