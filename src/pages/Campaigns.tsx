import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Users,
  Calendar,
  Clock,
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
  Crown,
  Lock,
  Globe,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Room = {
  id: string;
  name: string;
  gameSystem: string;
  genre: string;
  currentPlayers: number;
  maxPlayers: number;
  isPrivate: boolean;
  gameMaster: string;
  description: string;
  nextSession?: string;
  status: "active" | "full" | "paused" | "completed";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  createdAt: string;
};

const rooms: Room[] = [];

const RoomCard = ({
  room,
  onJoin,
  onEdit,
  onDelete,
  onView,
}: {
  room: Room;
  onJoin: (room: Room) => void;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
  onView: (room: Room) => void;
}) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    full: "bg-red-100 text-red-800",
    paused: "bg-yellow-100 text-yellow-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const statusLabels = {
    active: "Activa",
    full: "Llena",
    paused: "Pausada",
    completed: "Completada",
  };

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  const difficultyLabels = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
  };

  const genreColors = {
    Fantasía: "from-purple-500 to-pink-600",
    Horror: "from-red-600 to-gray-900",
    "Ciencia Ficción": "from-blue-500 to-cyan-600",
    Misterio: "from-indigo-500 to-purple-600",
    Aventura: "from-green-500 to-teal-600",
    Steampunk: "from-amber-600 to-orange-700",
  };

  const getPlayerStatus = () => {
    const percentage = (room.currentPlayers / room.maxPlayers) * 100;
    if (percentage >= 100) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Header con tema y estado */}
      <div
        className={`bg-gradient-to-r ${genreColors[room.genre as keyof typeof genreColors] ||
          "from-blue-500 to-purple-600"
          } p-4 text-white relative`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {room.isPrivate ? <Lock size={16} /> : <Globe size={16} />}
            <span className="text-sm opacity-90">
              {room.isPrivate ? "Privada" : "Pública"}
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[room.status as keyof typeof statusColors]
              }`}
          >
            {statusLabels[room.status as keyof typeof statusLabels]}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-1">{room.name}</h3>
        <div className="flex items-center gap-4 text-sm opacity-90">
          <span>{room.gameSystem}</span>
          <span>•</span>
          <span>{room.genre}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              <span className={`text-sm font-medium ${getPlayerStatus()}`}>
                {room.currentPlayers}/{room.maxPlayers} jugadores
              </span>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[
                room.difficulty as keyof typeof difficultyColors
              ]
                }`}
            >
              {
                difficultyLabels[
                room.difficulty as keyof typeof difficultyLabels
                ]
              }
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Crown size={14} />
            <span>GM: {room.gameMaster}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={14} />
            <span>Duración: {room.duration}</span>
          </div>

          {room.nextSession && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>Próxima sesión: {room.nextSession}</span>
            </div>
          )}

          <p className="text-sm text-gray-600 line-clamp-2">
            {room.description}
          </p>
        </div>

        {/* Barra de progreso de jugadores */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full ${room.currentPlayers >= room.maxPlayers
              ? "bg-red-500"
              : room.currentPlayers / room.maxPlayers >= 0.75
                ? "bg-yellow-500"
                : "bg-green-500"
              }`}
            style={{
              width: `${Math.min(
                (room.currentPlayers / room.maxPlayers) * 100,
                100
              )}%`,
            }}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={() => onJoin(room)}
            disabled={room.status === "full" || room.status === "completed"}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${room.status === "full" || room.status === "completed"
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
          >
            <Users size={14} />
            {room.status === "full"
              ? "Llena"
              : room.status === "completed"
                ? "Terminada"
                : "Unirse"}
          </button>
          <button
            onClick={() => onView(room)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm"
          >
            <Eye size={14} />
            Ver
          </button>
          <button
            onClick={() => onEdit(room)}
            className="flex items-center justify-center px-3 py-2 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100 transition-colors"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(room)}
            className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateRoomCard = ({ onCreate }: { onCreate: () => void }) => (
  <div
    onClick={onCreate}
    className="bg-white rounded-lg shadow-md dark:bg-gray-900 border-2 dark:border-gray-700 border-gray-300 hover:border-blue-400 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg dark:text-white"
  >
    <div className="h-full flex flex-col items-center justify-center p-8 text-center dark:bg-gray-900 dark:text-w">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 ">
        <Plus size={32} className="text-blue-600" />
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mb-2">
        Crear Nueva Sala
      </h3>
      <p className="text-gray-500 text-sm">Inicia una nueva aventura como GM</p>
    </div>
  </div>
);

interface FilterBarProps {
  filters: {
    search: string;
    gameSystem: string;
    genre: string;
    status: string;
    difficulty: string;
  };
  onFilterChange: (newFilters: {
    search: string;
    gameSystem: string;
    genre: string;
    status: string;
    difficulty: string;
  }) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: "name-asc" | "name-desc" | "players-asc" | "players-desc";
  onSortChange: (
    sort: "name-asc" | "name-desc" | "players-asc" | "players-desc"
  ) => void;
}

const FilterBar = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}: FilterBarProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 dark:bg-gray-900 dark:text-white">
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Barra de búsqueda */}
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar salas..."
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
          value={filters.gameSystem}
          onChange={(e) =>
            onFilterChange({ ...filters, gameSystem: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:text-gray-500 dark:bg-gray-800" value="">Todos los sistemas</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="D&D 5e">D&D 5e</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Pathfinder">Pathfinder</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Call of Cthulhu">Call of Cthulhu</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Vampire">Vampire</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Cyberpunk 2020">Cyberpunk 2020</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="GURPS">GURPS</option>
        </select>

        <select
          value={filters.genre}
          onChange={(e) =>
            onFilterChange({ ...filters, genre: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:text-gray-500 dark:bg-gray-800" value="">Todos los géneros</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Fantasía">Fantasía</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Horror">Horror</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Ciencia Ficción">Ciencia Ficción</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Misterio">Misterio</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Aventura">Aventura</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="Steampunk">Steampunk</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:text-gray-500 dark:bg-gray-800" value="">Todos los estados</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="active">Activa</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="full">Llena</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="paused">Pausada</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="completed">Completada</option>
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) =>
            onFilterChange({ ...filters, difficulty: e.target.value })
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:text-gray-500 dark:bg-gray-800" value="">Todas las dificultades</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="beginner">Principiante</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="intermediate">Intermedio</option>
          <option className="dark:text-gray-500 dark:bg-gray-800" value="advanced">Avanzado</option>
        </select>
      </div>

      {/* Controles de vista y ordenamiento */}
      <div className="flex gap-2">
        <button
          onClick={() =>
            onSortChange(sortBy === "name-asc" ? "name-desc" : "name-asc")
          }
          className="px-3 py- dark:hover:bg-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          {sortBy === "name-desc" ? (
            <SortDesc size={16} />
          ) : (
            <SortAsc size={16} />
          )}
          Nombre
        </button>

        <div className="flex border border-gray-300 rounded-md overflow-hidden dark:hover:bg-gray-800">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`px-3 py-2 ${viewMode === "grid"
              ? "bg-blue-500 text-white dark:hover:bg-blue-300 dark:bg-blue-600 "
              : "bg-white text-gray-700 hover:bg-gray-50 dark:hover:bg-blue-300 "
              } transition-colors`}
          >
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`px-3 py-2 ${viewMode === "list"
              ? "bg-blue-500 text-white dark:hover:bg-blue-300 dark:bg-blue-600"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:hover:bg-blue-300"
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
          ? "bg-blue-500 text-white dark:hover:bg-blue-300"
          : "border border-gray-300 hover:bg-gray-50 dark:hover:bg-blue-300"
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

function Rooms() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    gameSystem: "",
    genre: "",
    status: "",
    difficulty: "",
  });
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name-asc");
  const itemsPerPage = 8;

  // Filtrar y ordenar salas
  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        room.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesGameSystem =
        !filters.gameSystem || room.gameSystem === filters.gameSystem;
      const matchesGenre = !filters.genre || room.genre === filters.genre;
      const matchesStatus = !filters.status || room.status === filters.status;
      const matchesDifficulty =
        !filters.difficulty || room.difficulty === filters.difficulty;

      return (
        matchesSearch &&
        matchesGameSystem &&
        matchesGenre &&
        matchesStatus &&
        matchesDifficulty
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "players-asc":
          return a.currentPlayers - b.currentPlayers;
        case "players-desc":
          return b.currentPlayers - a.currentPlayers;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate("/campaigns/create");
  };

  const handleJoinRoom = (room: Room) => {
    console.log("Unirse a la sala:", room);
  };

  const handleViewRoom = (room: Room) => {
    console.log("Ver detalles de la sala:", room);
  };

  const handleEditRoom = (room: Room) => {
    console.log("Editar sala:", room);
  };

  const handleDeleteRoom = (room: Room) => {
    console.log("Eliminar sala:", room);
  };

  const activeRooms = rooms.filter((r) => r.status === "active").length;
  const totalPlayers = rooms.reduce((acc, r) => acc + r.currentPlayers, 0);
  const avgPlayersPerRoom = totalPlayers / rooms.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">
            Salas de Rol
          </h1>
          <p className="dark:text-white">Descubre y únete a aventuras épicas</p>
        </div>

        {/* Filtros */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode as "grid" | "list"}
          onViewModeChange={setViewMode}
          sortBy={
            sortBy as "name-asc" | "name-desc" | "players-asc" | "players-desc"
          }
          onSortChange={setSortBy}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 dark:bg-gray-900 dark:text-white">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 dark:bg-gray-900 dark:text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Salas Activas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeRooms}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Jugadores Conectados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalPlayers}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 dark:bg-gray-900 dark:text-white">
            <div className="flex items-center gap-3 ">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Promedio por Sala</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Number.isNaN(avgPlayersPerRoom) ? "0" : avgPlayersPerRoom.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de salas */}
        <div
          className={`grid gap-6 ${viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
            }`}
        >
          <CreateRoomCard onCreate={handleCreateRoom} />
          {paginatedRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onJoin={handleJoinRoom}
              onView={handleViewRoom}
              onEdit={handleEditRoom}
              onDelete={handleDeleteRoom}
            />
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron salas
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros o crea una nueva sala
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

export default Rooms;
