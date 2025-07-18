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
  nivel: number;
  estado: string;
  campaign: string;
  lastPlayed: string;
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


// Tipos básicos
interface FilterState {
  search: string;
  race: string;
  class: CharacterClass;
  status: string;
}

type SortBy = "name-asc" | "name-desc" | "level-asc" | "level-desc";

type ViewMode = "grid" | "list";

type CharacterClass =
  | "Mago"
  | "Guerrero"
  | "Ladrón"
  | "Clérigo"
  | "Bárbaro"
  | "Paladín";

// Interfaces de props
interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (character: Character) => void;
  onView: (character: Character) => void;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}





export type {
  InputFieldProps,
  SelectOption,
  SelectFieldProps,
  TextareaFieldProps,
  AttributeFieldProps,
  SectionProps,
  CreationModalProps,
  CharacterDisplayProps,
  Character,
  FilterState,
  SortBy,
  ViewMode,
  CharacterClass,
  CharacterCardProps,
  FilterBarProps,
};
