import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Users,
  Sword,
  Shield,
  Star,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Character, CharacterCardProps, CharacterClass, FilterBarProps, FilterState, SortBy, ViewMode } from "../Interfaces/Characters";

const characters: Character[] = [];

const CharacterCard = ({
  character,
  onEdit,
  onDelete,
  onView,
}: CharacterCardProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-100 text-gray-800",
  };

  const statusLabels = {
    active: "Activo",
    inactive: "Inactivo",
    archived: "Archivado",
  };

  const classIcons: Record<CharacterClass, typeof Star> = {
    Mago: Star,
    Guerrero: Sword,
    Ladrón: Eye,
    Clérigo: Shield,
    Bárbaro: Sword,
    Paladín: Shield,
  };

  const ClassIcon = classIcons[character.clase as keyof typeof classIcons] || Star;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Header con avatar y estado */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <ClassIcon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{character.nombre}</h3>
              <p className="text-blue-100 text-sm">Nivel {character.nivel}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[character.estado as keyof typeof statusColors]
              }`}
          >
            {statusLabels[character.estado as keyof typeof statusLabels]}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={14} />
            <span>
              {character.raza} - {character.clase}
            </span>
          </div>
          {character.campaign && (
            <div className="text-sm text-gray-500">
              <span className="font-medium">Campaña:</span> {character.campaign}
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(character)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm"
          >
            <Eye size={14} />
            Ver
          </button>
          <button
            onClick={() => onEdit(character)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm"
          >
            <Edit size={14} />
            Editar
          </button>
          <button
            onClick={() => onDelete(character)}
            className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateCharacterCard = ({ onCreate }: { onCreate: () => void }) => (
  <div
    onClick={onCreate}
    className="bg-white rounded-lg dark:bg-gray-900 shadow-md border-2 dark:border-gray-700 border-gray-300 hover:border-blue-400 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Plus size={32} className="text-blue-600" />
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mb-2">
        Crear Nuevo Personaje
      </h3>
      <p className="text-gray-500 text-sm">Comienza una nueva aventura</p>
    </div>
  </div>
);

const FilterBar = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}: FilterBarProps) => (
  <div className="bg-white rounded-lg dark:bg-gray-900 shadow-sm border border-gray-200 p-4 mb-6">
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Barra de búsqueda */}
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar personajes..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <select
          value={filters.race}
          onChange={(e) => onFilterChange({ ...filters, race: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:text-gray-500 dark:bg-gray-800" value="">Todas las razas</option>
          <option className="text-gray-500 dark:bg-gray-800" value="Humano">Humano</option>
          <option className="text-gray-500 dark:bg-gray-800" value="Elfo">Elfo</option>
          <option className="text-gray-500 dark:bg-gray-800" value="Enano">Enano</option>
          <option className="text-gray-500 dark:bg-gray-800" value="Gnomo">Gnomo</option>
          <option className="text-gray-500 dark:bg-gray-800" value="Mediano">Mediano</option>
          <option className="text-gray-500 dark:bg-gray-800" value="Tiefling">Tiefling</option>
        </select>

        <select
          value={filters.class}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              class: e.target.value as CharacterClass,
            })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:text-gray-500 dark:bg-gray-800" value="">Todas las clases</option>
          {["Mago", "Guerrero", "Ladrón", "Clérigo", "Bárbaro", "Paladín"].map(
            (className) => (
              <option className="dark:text-gray-500 dark:bg-gray-800" key={className} value={className}>
                {className}
              </option>
            )
          )}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:text-gray-500 dark:bg-gray-800" value="">Todos los estados</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="active">Activo</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="inactive">Inactivo</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="archived">Archivado</option>
        </select>
      </div>

      {/* Controles de vista y ordenamiento */}
      <div className="flex gap-2">
        <button
          onClick={() =>
            onSortChange(sortBy === "name-asc" ? "name-desc" : "name-asc")
          }
          className="px-3 py-2 border dark:hover:bg-gray-800 dark:bg-gray-900 border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          {sortBy === "name-desc" ? (
            <SortDesc size={16} />
          ) : (
            <SortAsc size={16} />
          )}
          Nombre
        </button>

        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`px-3 py-2 ${viewMode === "grid"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
              } transition-colors`}
          >
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`px-3 py-2 ${viewMode === "list"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
              } transition-colors`}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex items-center justify-center gap-2 mt-8">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <ChevronLeft size={16} />
    </button>

    {Array.from({ length: totalPages }).map((_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={`px-3 py-2 rounded-md transition-colors ${currentPage === i + 1
          ? "bg-blue-500 text-white"
          : "border border-gray-300 hover:bg-gray-50"
          }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <ChevronRight size={16} />
    </button>
  </div>
);

function Characters() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    race: "",
    class: "" as CharacterClass,
    status: "",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("name-asc");
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const handleCreateCharacter = () => {
    navigate(`/characters/create`)
  };

  const handleViewCharacter = (character: Character) => {
    navigate(`/characters/view/${character.id}`)
  };

  const handleEditCharacter = (character: Character) => {
    navigate(`/characters/edit/${character.id}`)
  };

  const handleDeleteCharacter = (character: Character) => {
    navigate(`/characters/delete/${character.id}`)
  };

  const filteredCharacters = characters
    .filter((char: Character) => {
      const matchesSearch = char.nombre
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesRace = !filters.race || char.raza === filters.race;
      const matchesClass = !filters.class || char.clase === filters.class;
      const matchesStatus = !filters.status || char.estado === filters.status;

      return matchesSearch && matchesRace && matchesClass && matchesStatus;
    })
    .sort((a: Character, b: Character) => {
      switch (sortBy) {
        case "name-asc":
          return a.nombre.localeCompare(b.nombre);
        case "name-desc":
          return b.nombre.localeCompare(a.nombre);
        case "level-asc":
          return a.nivel! - b.nivel!;
        case "level-desc":
          return b.nivel! - a.nivel!;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 dark:text-white">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">
            Tus Personajes
          </h1>
          <p className="text-gray-600 ">Administra tus héroes y aventureros</p>
        </div>

        {/* Filtros */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Stats */}
        <div className="grid dark:bg-gray-900 grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Personajes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {characters.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex dark:bg-gray-900 items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Personajes Activos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {characters.filter((c) => c.estado === "active").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Sword className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nivel Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    characters.reduce((acc, c) => acc + c.nivel!, 0) /
                    characters.length
                  ) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de personajes */}
        <div
          className={`grid gap-6 ${viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
            }`}
        >
          <CreateCharacterCard onCreate={handleCreateCharacter} />
          {paginatedCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onView={handleViewCharacter}
              onEdit={handleEditCharacter}
              onDelete={handleDeleteCharacter}
            />
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron personajes
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros o crea un nuevo personaje
            </p>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default Characters;
