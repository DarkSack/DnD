import React from "react";
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
  Info,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react";
import type { Character, CharacterDisplayProps } from "@/Interfaces/Characters";
import { GenerateUID } from "@/utils/Functions";

const AttributeDisplay = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) => {
  const getModifier = (value: number) => {
    return Math.floor((value - 10) / 2);
  };

  const getModifierString = (modifier: number) => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-200">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon size={18} className="text-blue-600" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">
        {getModifierString(getModifier(value))}
      </div>
    </div>
  );
};

const InfoSection = ({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) => (
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

const ListDisplay = ({
  items,
  emptyMessage = "No hay elementos",
}: {
  items: string[];
  emptyMessage?: string;
}) => {
  const filteredItems = items.filter((item) => item.trim() !== "");

  if (filteredItems.length === 0) {
    return <p className="text-gray-500 italic">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-2">
      {filteredItems.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
};

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  className = "",
}) => {
  const getAlineamientoColor = (alineamiento: string) => {
    const colors: { [key: string]: string } = {
      "Legal Bueno": "bg-blue-100 text-blue-800",
      "Neutral Bueno": "bg-green-100 text-green-800",
      "Caótico Bueno": "bg-yellow-100 text-yellow-800",
      "Legal Neutral": "bg-gray-100 text-gray-800",
      Neutral: "bg-purple-100 text-purple-800",
      "Caótico Neutral": "bg-orange-100 text-orange-800",
      "Legal Malvado": "bg-red-100 text-red-800",
      "Neutral Malvado": "bg-pink-100 text-pink-800",
      "Caótico Malvado": "bg-indigo-100 text-indigo-800",
    };
    return colors[alineamiento] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className={`max-w-7xl mx-auto p-4 ${className}`}>
      {/* Cabecera del personaje */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User size={32} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl mb-2 pb-2 font-bold text-black">
                {character.nombre || "Sin nombre"}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-black bg-white bg-opacity-20 rounded-full text-sm">
                  {character.raza || "Sin raza"}
                </span>
                <span className="px-3 py-1 text-black bg-white bg-opacity-20 rounded-full text-sm">
                  {character.clase || "Sin clase"}
                </span>
                <span className="px-3 py-1 text-black bg-white bg-opacity-20 rounded-full text-sm">
                  {character.genero || "Sin género"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} />
              <span className="text-sm opacity-90">
                {character.edad > 0
                  ? `${character.edad} años`
                  : "Edad no especificada"}
              </span>
            </div>
            {character.alineamiento && (
              <span
                className={`px-3 py-1 rounded-full text-sm ${getAlineamientoColor(
                  character.alineamiento
                )}`}
              >
                {character.alineamiento}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda */}
        <div className="space-y-6">
          {/* Información básica adicional */}
          <InfoSection title="Información Básica" icon={Users}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Religión:</span>
                <p className="font-medium">
                  {character.religion || "Sin religión"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Alineamiento:</span>
                <p className="font-medium">
                  {character.alineamiento || "Sin alineamiento"}
                </p>
              </div>
            </div>
          </InfoSection>

          {/* Rasgos Físicos */}
          <InfoSection title="Apariencia Física" icon={Eye}>
            <ListDisplay
              items={character.rasgos_fisicos}
              emptyMessage="No hay descripción física"
            />
          </InfoSection>

          {/* Personalidad */}
          <InfoSection title="Personalidad" icon={Heart}>
            <ListDisplay
              items={character.personalidad}
              emptyMessage="No hay rasgos de personalidad definidos"
            />
          </InfoSection>

          {/* Trasfondo */}
          <InfoSection title="Historia y Trasfondo" icon={BookOpen}>
            <div className="text-gray-700 leading-relaxed">
              {character.trasfondo ? (
                <p>{character.trasfondo}</p>
              ) : (
                <p className="text-gray-500 italic">No hay historia definida</p>
              )}
            </div>
          </InfoSection>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-6">
          {/* Atributos */}
          <InfoSection title="Atributos" icon={Zap}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <AttributeDisplay
                label="Fuerza"
                value={character.fuerza}
                icon={Sword}
              />
              <AttributeDisplay
                label="Destreza"
                value={character.destreza}
                icon={Eye}
              />
              <AttributeDisplay
                label="Constitución"
                value={character.constitucion}
                icon={Shield}
              />
              <AttributeDisplay
                label="Inteligencia"
                value={character.inteligencia}
                icon={Brain}
              />
              <AttributeDisplay
                label="Sabiduría"
                value={character.sabiduria}
                icon={BookOpen}
              />
              <AttributeDisplay
                label="Carisma"
                value={character.carisma}
                icon={Smile}
              />
            </div>
          </InfoSection>

          {/* Habilidades */}
          <InfoSection title="Habilidades" icon={Star}>
            <ListDisplay
              items={character.habilidades}
              emptyMessage="No hay habilidades definidas"
            />
          </InfoSection>

          {/* Rasgos Únicos */}
          <InfoSection title="Rasgos Únicos" icon={Sparkles}>
            <ListDisplay
              items={character.rasgos_unicos}
              emptyMessage="No hay rasgos únicos definidos"
            />
          </InfoSection>

          {/* Datos Extra */}
          {character.datos_extra && (
            <InfoSection title="Información Adicional" icon={Info}>
              <div className="text-gray-700 leading-relaxed">
                <p>{character.datos_extra}</p>
              </div>
            </InfoSection>
          )}
        </div>
      </div>
    </div>
  );
};

const ExampleCharacter: Character = {
  id: GenerateUID(),
  user_id: GenerateUID(),
  nombre: "Lyra Nightwhisper",
  genero: "Femenino",
  raza: "Elfo",
  clase: "Explorador",
  edad: 127,
  rasgos_fisicos: [
    "Cabello plateado que brilla bajo la luz de la luna",
    "Ojos verdes como esmeraldas",
    "Estatura media con complexión atlética",
    "Cicatriz en forma de luna creciente en la mejilla izquierda",
  ],
  personalidad: [
    "Observadora y cautelosa",
    "Leal a sus compañeros",
    "Prefiere la soledad del bosque",
    "Desconfía de los extraños",
  ],
  trasfondo:
    "Criada en los bosques ancestrales por una comunidad de druidas, Lyra aprendió desde pequeña a comunicarse con la naturaleza. Tras la destrucción de su aldea por invasores, juró proteger los últimos santuarios naturales del reino.",
  fuerza: 12,
  destreza: 16,
  constitucion: 14,
  inteligencia: 13,
  sabiduria: 15,
  carisma: 10,
  habilidades: [
    "Supervivencia",
    "Sigilo",
    "Puntería con arco",
    "Rastreo",
    "Conocimiento de la naturaleza",
  ],
  rasgos_unicos: [
    "Puede comunicarse con animales del bosque",
    "Visión nocturna mejorada",
    "Resistencia natural a encantos",
  ],
  alineamiento: "Neutral Bueno",
  religion: "Silvanus, dios de la naturaleza",
  datos_extra:
    "Porta un arco élfico heredado de su mentora druida. Tiene una mascota: un halcón llamado Viento Susurrante.",
};

export default function CharacterDisplayDemo() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <CharacterDisplay character={ExampleCharacter} />
      </div>
    </div>
  );
}
