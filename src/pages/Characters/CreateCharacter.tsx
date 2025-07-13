import { useState, useCallback, useEffect } from "react";
import {
  User,
  Sword,
  Shield,
  Star,
  BookOpen,
  Zap,
  Heart,
  Brain,
  Eye,
  Smile,
  Loader2,
  Sparkles,
  UserPlus,
} from "lucide-react";

interface Character {
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

// Componente para campos de entrada
const InputField = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: InputFieldProps) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);

// Componente para campos de selección
const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  placeholder = "Selecciona una opción",
}: SelectFieldProps) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Componente para campos de texto largo
const TextareaField = ({
  label,
  id,
  value,
  onChange,
  rows = 3,
  placeholder = "",
}: TextareaFieldProps) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
    />
  </div>
);

// Componente para atributos numéricos
const AttributeField = ({ label, id, value, onChange, icon: Icon }: AttributeFieldProps) => (
  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-gray-600" />
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
    <input
      type="number"
      id={id}
      value={value}
      onChange={onChange}
      min="1"
      max="20"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center font-bold"
    />
  </div>
);

// Componente para secciones
const Section = ({ title, icon: Icon, children, className = "" }: SectionProps) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
  >
    <div className="flex items-center gap-2 mb-4">
      <Icon size={20} className="text-blue-600" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

// Modal de creación
const CreationModal = ({ isOpen, onClose, onCreateAI, loading }: CreationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Crear Personaje
          </h2>
          <p className="text-gray-600">¿Cómo deseas crear tu personaje?</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <User size={18} />
            Creación Manual
          </button>

          <button
            onClick={onCreateAI}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Sparkles size={18} />
            )}
            {loading ? "Generando..." : "Generar con IA"}
          </button>
        </div>
      </div>
    </div>
  );
};

function CreateCharacter() {
  const [character, setCharacter] = useState<Character>({
    nombre: "",
    genero: "",
    raza: "",
    clase: "",
    edad: 0,
    rasgos_fisicos: [],
    personalidad: [],
    trasfondo: "",
    atributos: {
      fuerza: 10,
      destreza: 10,
      constitucion: 10,
      inteligencia: 10,
      sabiduria: 10,
      carisma: 10,
    },
    habilidades: [],
    rasgos_unicos: [],
    alineamiento: "",
    religion: "",
    datos_extra: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCharacter = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/character/summonHero",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCharacter(data as Character);
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching character:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (character.nombre !== "") {
      setIsModalOpen(false);
    }
  }, [character]);

  const generoOptions = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
    { value: "Otro", label: "Otro" },
  ];

  const razaOptions = [
    { value: "Human", label: "Humano" },
    { value: "Elfo", label: "Elfo" },
    { value: "Enano", label: "Enano" },
    { value: "Gnomo", label: "Gnomo" },
    { value: "Mediano", label: "Mediano" },
    { value: "Tiefling", label: "Tiefling" },
  ];

  const claseOptions = [
    { value: "Mago", label: "Mago" },
    { value: "Clérigo", label: "Clérigo" },
    { value: "Guerrero", label: "Guerrero" },
    { value: "Ladrón", label: "Ladrón" },
    { value: "Bárbaro", label: "Bárbaro" },
    { value: "Paladín", label: "Paladín" },
  ];

  const alineamientoOptions = [
    { value: "Bueno", label: "Bueno" },
    { value: "Neutral", label: "Neutral" },
    { value: "Malo", label: "Malo" },
    { value: "Leal", label: "Leal" },
    { value: "Caótico", label: "Caótico" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateAI={fetchCharacter}
        loading={loading}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Creador de Personajes
          </h1>
          <p className="text-gray-600">Crea tu héroe para la aventura</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            {/* Información Básica */}
            <Section title="Información Básica" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nombre"
                  id="nombre"
                  value={character.nombre}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({ ...character, nombre: e.target.value })
                  }
                  placeholder="Nombre del personaje"
                />

                <SelectField
                  label="Género"
                  id="genero"
                  value={character.genero}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCharacter({ ...character, genero: e.target.value })
                  }
                  options={generoOptions}
                />

                <SelectField
                  label="Raza"
                  id="raza"
                  value={character.raza}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCharacter({ ...character, raza: e.target.value })
                  }
                  options={razaOptions}
                />

                <SelectField
                  label="Clase"
                  id="clase"
                  value={character.clase}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCharacter({ ...character, clase: e.target.value })
                  }
                  options={claseOptions}
                />

                <InputField
                  label="Edad"
                  id="edad"
                  type="number"
                  value={character.edad}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({
                      ...character,
                      edad: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Edad del personaje"
                />

                <SelectField
                  label="Alineamiento"
                  id="alineamiento"
                  value={character.alineamiento}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCharacter({ ...character, alineamiento: e.target.value })
                  }
                  options={alineamientoOptions}
                />
              </div>
            </Section>

            {/* Personalidad y Trasfondo */}
            <Section title="Personalidad y Trasfondo" icon={Heart}>
              <div className="space-y-4">
                <TextareaField
                  label="Personalidad"
                  id="personalidad"
                  value={character.personalidad.join("\n")}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCharacter({
                      ...character,
                      personalidad: e.target.value.split("\n"),
                    })
                  }
                  rows={4}
                  placeholder="Describe los rasgos de personalidad (uno por línea)"
                />

                <TextareaField
                  label="Trasfondo"
                  id="trasfondo"
                  value={character.trasfondo}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCharacter({ ...character, trasfondo: e.target.value })
                  }
                  rows={4}
                  placeholder="Historia del personaje"
                />

                <TextareaField
                  label="Rasgos Físicos"
                  id="rasgos_fisicos"
                  value={character.rasgos_fisicos.join("\n")}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCharacter({
                      ...character,
                      rasgos_fisicos: e.target.value.split("\n"),
                    })
                  }
                  rows={4}
                  placeholder="Describe la apariencia física (uno por línea)"
                />
              </div>
            </Section>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            {/* Atributos */}
            <Section title="Atributos" icon={Zap}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <AttributeField
                  label="Fuerza"
                  id="fuerza"
                  value={character.atributos.fuerza}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({
                      ...character,
                      atributos: {
                        ...character.atributos,
                        fuerza: parseInt(e.target.value) || 10,
                      },
                    })
                  }
                  icon={Sword}
                />

                <AttributeField
                  label="Destreza"
                  id="destreza"
                  value={character.atributos.destreza}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({
                      ...character,
                      atributos: {
                        ...character.atributos,
                        destreza: parseInt(e.target.value) || 10,
                      },
                    })
                  }
                  icon={Eye}
                />

                <AttributeField
                  label="Constitución"
                  id="constitucion"
                  value={character.atributos.constitucion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({
                      ...character,
                      atributos: {
                        ...character.atributos,
                        constitucion: parseInt(e.target.value) || 10,
                      },
                    })
                  }
                  icon={Shield}
                />

                <AttributeField
                  label="Inteligencia"
                  id="inteligencia"
                  value={character.atributos.inteligencia}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({
                      ...character,
                      atributos: {
                        ...character.atributos,
                        inteligencia: parseInt(e.target.value) || 10,
                      },
                    })
                  }
                  icon={Brain}
                />

                <AttributeField
                  label="Sabiduría"
                  id="sabiduria"
                  value={character.atributos.sabiduria}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({
                      ...character,
                      atributos: {
                        ...character.atributos,
                        sabiduria: parseInt(e.target.value) || 10,
                      },
                    })
                  }
                  icon={BookOpen}
                />

                <AttributeField
                  label="Carisma"
                  id="carisma"
                  value={character.atributos.carisma}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({
                      ...character,
                      atributos: {
                        ...character.atributos,
                        carisma: parseInt(e.target.value) || 10,
                      },
                    })
                  }
                  icon={Smile}
                />
              </div>
            </Section>

            {/* Habilidades y Rasgos */}
            <Section title="Habilidades y Rasgos" icon={Star}>
              <div className="space-y-4">
                <TextareaField
                  label="Habilidades"
                  id="habilidades"
                  value={character.habilidades.join("\n")}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCharacter({
                      ...character,
                      habilidades: e.target.value.split("\n"),
                    })
                  }
                  rows={4}
                  placeholder="Lista de habilidades (una por línea)"
                />

                <TextareaField
                  label="Rasgos Únicos"
                  id="rasgos_unicos"
                  value={character.rasgos_unicos.join("\n")}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCharacter({
                      ...character,
                      rasgos_unicos: e.target.value.split("\n"),
                    })
                  }
                  rows={4}
                  placeholder="Características especiales (una por línea)"
                />
              </div>
            </Section>

            {/* Información Adicional */}
            <Section title="Información Adicional" icon={BookOpen}>
              <div className="space-y-4">
                <InputField
                  label="Religión"
                  id="religion"
                  value={character.religion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacter({ ...character, religion: e.target.value })
                  }
                  placeholder="Deidad o creencia"
                />

                <TextareaField
                  label="Datos Extra"
                  id="datos_extra"
                  value={character.datos_extra}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCharacter({ ...character, datos_extra: e.target.value })
                  }
                  rows={4}
                  placeholder="Información adicional sobre el personaje"
                />
              </div>
            </Section>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Sparkles size={18} />
            Generar Nuevo Personaje
          </button>
          <button
            onClick={() => console.log("Guardando personaje:", character)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <User size={18} />
            Guardar Personaje
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCharacter;
