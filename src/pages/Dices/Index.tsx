import { useState } from "react";
import {
  Search,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Star,
  Sword,
  Shield,
  Zap,
  Target,
  Grid3X3,
  List,
  Info,
  BookOpen,
  Sparkles,
  Users,
  Activity,
} from "lucide-react";
import type { DiceType, FilterState, ViewMode } from "@/Interfaces/Dices";







const diceData: DiceType[] = [
  {
    id: "d4",
    name: "Dado de 4 caras",
    sides: 4,
    notation: "d4",
    description:
      "Un tetraedro con cuatro caras triangulares. Es el dado más pequeño y se usa principalmente para daño de armas menores.",
    commonUses: [
      "Daño de daga",
      "Puntos de vida de magos",
      "Modificadores menores",
    ],
    examples: ["1d4 de daño por daga", "1d4+1 puntos de vida por nivel"],
    color: "bg-red-500",
    icon: Dice1,
    rarity: "common",
    games: ["D&D", "Pathfinder", "World of Darkness"],
  },
  {
    id: "d6",
    name: "Dado de 6 caras",
    sides: 6,
    notation: "d6",
    description:
      "El dado más común y reconocible. Un cubo con seis caras cuadradas numeradas del 1 al 6.",
    commonUses: [
      "Daño de espada corta",
      "Estadísticas de personaje",
      "Mecánicas generales",
    ],
    examples: [
      "1d6 de daño por espada",
      "3d6 para estadísticas",
      "2d6+3 para ataque",
    ],
    color: "bg-blue-500",
    icon: Dice6,
    rarity: "common",
    games: ["D&D", "Pathfinder", "GURPS", "Shadowrun"],
  },
  {
    id: "d8",
    name: "Dado de 8 caras",
    sides: 8,
    notation: "d8",
    description:
      "Un octaedro con ocho caras triangulares. Muy común en juegos de rol modernos.",
    commonUses: [
      "Daño de espada larga",
      "Puntos de vida de clérigos",
      "Hechizos de nivel bajo",
    ],
    examples: [
      "1d8 de daño por espada larga",
      "1d8+Con puntos de vida",
      "2d8 daño por hechizo",
    ],
    color: "bg-green-500",
    icon: Dice2,
    rarity: "common",
    games: ["D&D", "Pathfinder", "13th Age"],
  },
  {
    id: "d10",
    name: "Dado de 10 caras",
    sides: 10,
    notation: "d10",
    description:
      "Un pentagonal trapezoedro con diez caras. Numerado del 0-9 o 1-10 según el sistema.",
    commonUses: [
      "Porcentajes",
      "Daño de armas pesadas",
      "Mecánicas de World of Darkness",
    ],
    examples: ["1d10 de daño", "d100 con dos d10", "Tiradas de porcentaje"],
    color: "bg-purple-500",
    icon: Dice3,
    rarity: "common",
    games: ["D&D", "World of Darkness", "Call of Cthulhu"],
  },
  {
    id: "d12",
    name: "Dado de 12 caras",
    sides: 12,
    notation: "d12",
    description:
      "Un dodecaedro con doce caras pentagonales. Menos común pero muy útil para ciertos roles.",
    commonUses: [
      "Daño de hacha grande",
      "Puntos de vida de bárbaro",
      "Efectos especiales",
    ],
    examples: [
      "1d12 de daño por hacha",
      "1d12+Con puntos de vida",
      "1d12 para efectos aleatorios",
    ],
    color: "bg-orange-500",
    icon: Dice4,
    rarity: "uncommon",
    games: ["D&D", "Pathfinder", "Savage Worlds"],
  },
  {
    id: "d20",
    name: "Dado de 20 caras",
    sides: 20,
    notation: "d20",
    description:
      "Un icosaedro con veinte caras triangulares. El dado más emblemático del D&D moderno.",
    commonUses: [
      "Tiradas de ataque",
      "Tiradas de habilidad",
      "Tiradas de salvación",
    ],
    examples: [
      "1d20+5 para atacar",
      "1d20+modificador de habilidad",
      "Tiradas de crítico",
    ],
    color: "bg-indigo-500",
    icon: Dice5,
    rarity: "common",
    games: ["D&D", "Pathfinder", "13th Age", "Mutants & Masterminds"],
  },
  {
    id: "d100",
    name: "Dado de 100 caras",
    sides: 100,
    notation: "d100 / d%",
    description:
      "Representado por dos d10 (uno para decenas, otro para unidades) o un dado físico de 100 caras.",
    commonUses: [
      "Tablas de efectos aleatorios",
      "Porcentajes",
      "Encuentros aleatorios",
    ],
    examples: [
      "d100 en tabla de tesoros",
      "85% de probabilidad",
      "Encuentros aleatorios",
    ],
    color: "bg-pink-500",
    icon: Sparkles,
    rarity: "uncommon",
    games: ["D&D", "Call of Cthulhu", "Warhammer Fantasy"],
  },
  {
    id: "d3",
    name: "Dado de 3 caras",
    sides: 3,
    notation: "d3",
    description:
      "Resultado de 1d6 dividido por 2 (redondeado hacia arriba) o un dado físico triangular.",
    commonUses: ["Daño mínimo", "Efectos menores", "Modificadores pequeños"],
    examples: [
      "1d3 de daño por puño",
      "1d3 rondas de efecto",
      "1d3+1 munición",
    ],
    color: "bg-yellow-500",
    icon: Target,
    rarity: "rare",
    games: ["D&D", "Pathfinder", "Sistemas caseros"],
  },
  {
    id: "d30",
    name: "Dado de 30 caras",
    sides: 30,
    notation: "d30",
    description:
      "Un dado menos común con 30 caras. Usado en sistemas específicos o efectos especiales.",
    commonUses: [
      "Efectos muy aleatorios",
      "Tablas extensas",
      "Sistemas específicos",
    ],
    examples: [
      "1d30 días de duración",
      "Tabla de 30 efectos",
      "Variaciones extremas",
    ],
    color: "bg-teal-500",
    icon: Zap,
    rarity: "rare",
    games: ["Sistemas específicos", "Homebrew", "Efectos especiales"],
  },
];

const DiceCard = ({ dice }: { dice: DiceType }) => {
  const [showDetails, setShowDetails] = useState(false);

  const rarityColors = {
    common: "border-green-300 bg-green-50",
    uncommon: "border-yellow-300 bg-yellow-50",
    rare: "border-purple-300 bg-purple-50",
  };

  const rarityLabels = {
    common: "Común",
    uncommon: "Poco común",
    rare: "Raro",
  };

  const IconComponent = dice.icon;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className={`${dice.color} p-4 text-white relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <IconComponent size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{dice.name}</h3>
              <p className="text-white/80 text-sm">{dice.notation}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{dice.sides}</span>
            <p className="text-white/80 text-xs">caras</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
            rarityColors[dice.rarity]
          }`}
        >
          {rarityLabels[dice.rarity]}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {dice.description}
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">
              Usos comunes:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {dice.commonUses.slice(0, 2).map((use, index) => (
                <li key={index} className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">
              Ejemplos:
            </h4>
            <div className="flex flex-wrap gap-1">
              {dice.examples.slice(0, 2).map((example, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm"
          >
            <Info size={14} />
            {showDetails ? "Ocultar" : "Ver más"}
          </button>
        </div>

        {/* Detailed info */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                Juegos que lo usan:
              </h4>
              <div className="flex flex-wrap gap-1">
                {dice.games.map((game, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {game}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                Todos los usos:
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {dice.commonUses.map((use, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterBar = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Search bar */}
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar dados..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <select
          value={filters.rarity}
          onChange={(e) =>
            onFilterChange({ ...filters, rarity: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las rarezas</option>
          <option value="common">Común</option>
          <option value="uncommon">Poco común</option>
          <option value="rare">Raro</option>
        </select>

        <select
          value={filters.game}
          onChange={(e) => onFilterChange({ ...filters, game: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los juegos</option>
          <option value="D&D">D&D</option>
          <option value="Pathfinder">Pathfinder</option>
          <option value="World of Darkness">World of Darkness</option>
          <option value="Call of Cthulhu">Call of Cthulhu</option>
          <option value="GURPS">GURPS</option>
        </select>
      </div>

      {/* View controls */}
      <div className="flex border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`px-3 py-2 ${
            viewMode === "grid"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } transition-colors`}
        >
          <Grid3X3 size={16} />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`px-3 py-2 ${
            viewMode === "list"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } transition-colors`}
        >
          <List size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default function DiceGuide() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    rarity: "",
    game: "",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredDice = diceData.filter((dice) => {
    const matchesSearch =
      dice.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      dice.notation.toLowerCase().includes(filters.search.toLowerCase());
    const matchesRarity = !filters.rarity || dice.rarity === filters.rarity;
    const matchesGame = !filters.game || dice.games.includes(filters.game);

    return matchesSearch && matchesRarity && matchesGame;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Guía de Dados de Rol
          </h1>
          <p className="text-gray-600">
            Todo lo que necesitas saber sobre los dados en los juegos de rol
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Dice6 className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipos de Dados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diceData.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Más Común</p>
                <p className="text-2xl font-bold text-gray-900">d20</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rango de Caras</p>
                <p className="text-2xl font-bold text-gray-900">3-100</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sistemas</p>
                <p className="text-2xl font-bold text-gray-900">15+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={24} />
              <h3 className="text-xl font-bold">¿Qué es un dado?</h3>
            </div>
            <p className="text-blue-100">
              Los dados son herramientas de azar que determinan el resultado de
              las acciones en los juegos de rol, desde ataques hasta hechizos.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Sword size={24} />
              <h3 className="text-xl font-bold">Notación de Dados</h3>
            </div>
            <p className="text-green-100">
              La notación "XdY" significa "lanzar X dados de Y caras". Por
              ejemplo, 2d6 significa lanzar 2 dados de 6 caras.
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Shield size={24} />
              <h3 className="text-xl font-bold">Modificadores</h3>
            </div>
            <p className="text-orange-100">
              Los modificadores se añaden al resultado: "1d20+5" significa
              lanzar un d20 y sumar 5 al resultado.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Dice Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredDice.map((dice) => (
            <DiceCard key={dice.id} dice={dice} />
          ))}
        </div>

        {/* No results message */}
        {filteredDice.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Dice6 size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron dados
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
