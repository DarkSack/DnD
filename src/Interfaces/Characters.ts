interface Character {
  id: string;
  nombre: string;
  genero: string;
  raza: string;
  clase: string;
  edad: number;
  rasgos_fisicos: string[];
  personalidad: string[];
  trasfondo: string;
  atributos: {
    fuerza: number;
    destreza: number;
    constitucion: number;
    inteligencia: number;
    sabiduria: number;
    carisma: number;
  };
  habilidades: string[];
  rasgos_unicos: string[];
  alineamiento: string;
  religion: string;
  datos_extra: string;
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

// Definir la interfaz de props para AttributeField
interface AttributeFieldProps {
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

interface CharacterDisplayProps {
  character: Character;
  className?: string;
}

export type {
  Character,
  InputFieldProps,
  SelectOption,
  SelectFieldProps,
  TextareaFieldProps,
  AttributeFieldProps,
  SectionProps,
  CreationModalProps,
  CharacterDisplayProps,
};
