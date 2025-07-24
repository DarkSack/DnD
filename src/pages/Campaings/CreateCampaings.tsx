import { useState, useCallback, useEffect } from "react";
import {
  Users,
  Gamepad2,
  BookOpen,
  Eye,
  Loader2,
  Sparkles,
  Plus,
  Settings,
  Calendar,
  User,
  Lock,
  Unlock,
  Star,
} from "lucide-react";
import type {
  InputFieldProps,
  SelectFieldProps,
  TextareaFieldProps,
  NumberFieldProps,
  ToggleFieldProps,
  SectionProps,
  CreationModalProps,
  Room,
} from "@/Interfaces/Campaings";
import { GenerateUID } from "@/utils/Functions";


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
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
    />
  </div>
);

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
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
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
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
    />
  </div>
);

const NumberField = ({
  label,
  id,
  value,
  onChange,
  min = 1,
  max = 10,
  icon: Icon,
}: NumberFieldProps) => (
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
      min={min}
      max={max}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-center font-bold"
    />
  </div>
);

const ToggleField = ({
  label,
  id,
  value,
  onChange,
  icon: Icon,
}: ToggleFieldProps) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-gray-600" />
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-purple-600" : "bg-gray-200"
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"
          }`}
      />
    </button>
  </div>
);

const Section = ({
  title,
  icon: Icon,
  children,
  className = "",
}: SectionProps) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
  >
    <div className="flex items-center gap-2 mb-4">
      <Icon size={20} className="text-purple-600" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

const CreationModal = ({
  isOpen,
  onClose,
  onCreateAI,
  loading,
}: CreationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <Plus className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Crear Sala de Rol
          </h2>
          <p className="text-gray-600">¿Cómo deseas crear tu sala?</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <Settings size={18} />
            Creación Manual
          </button>

          <button
            onClick={onCreateAI}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
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

function CreateRoom() {
  const [room, setRoom] = useState<Room>({
    id: GenerateUID(),
    name: "",
    gameSystem: "",
    genre: "",
    currentPlayers: 1,
    maxPlayers: 5,
    isPrivate: false,
    gameMaster: "",
    description: "",
    nextSession: "",
    status: "active",
    difficulty: "",
    duration: "",
    createdAt: new Date().toLocaleDateString(),
  });

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const fetchRoom = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/histories/createHistory",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setRoom((prev) => ({
        ...prev,
        ...data,
      }));
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching room:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (room.name !== "") {
      setIsModalOpen(false);
    }
  }, [room]);

  const gameSystemOptions = [
    { value: "D&D 5e", label: "Dungeons & Dragons 5e" },
    { value: "Pathfinder", label: "Pathfinder" },
    { value: "Call of Cthulhu", label: "Call of Cthulhu" },
    { value: "Vampire", label: "Vampire: The Masquerade" },
    { value: "Cyberpunk", label: "Cyberpunk 2020" },
    { value: "World of Darkness", label: "World of Darkness" },
  ];

  const genreOptions = [
    { value: "Fantasy", label: "Fantasía" },
    { value: "Horror", label: "Horror" },
    { value: "Sci-Fi", label: "Ciencia Ficción" },
    { value: "Mystery", label: "Misterio" },
    { value: "Adventure", label: "Aventura" },
    { value: "Cyberpunk", label: "Cyberpunk" },
  ];

  const statusOptions = [
    { value: "active", label: "Activa" },
    { value: "recruiting", label: "Reclutando" },
    { value: "full", label: "Completa" },
    { value: "paused", label: "Pausada" },
  ];

  const difficultyOptions = [
    { value: "beginner", label: "Principiante" },
    { value: "intermediate", label: "Intermedio" },
    { value: "advanced", label: "Avanzado" },
    { value: "expert", label: "Experto" },
  ];

  const durationOptions = [
    { value: "1-2 hours", label: "1-2 horas" },
    { value: "2-4 hours", label: "2-4 horas" },
    { value: "4-6 hours", label: "4-6 horas" },
    { value: "6+ hours", label: "6+ horas" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateAI={fetchRoom}
        loading={loading}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Creador de Salas de Rol
          </h1>
          <p className="text-gray-600">
            Crea tu sala para comenzar la aventura
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            {/* Información Básica */}
            <Section title="Información Básica" icon={Gamepad2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InputField
                    label="Nombre de la Sala"
                    id="name"
                    value={room.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRoom({ ...room, name: e.target.value })
                    }
                    placeholder="Nombre de la sala"
                  />
                </div>

                <SelectField
                  label="Sistema de Juego"
                  id="gameSystem"
                  value={room.gameSystem}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRoom({ ...room, gameSystem: e.target.value })
                  }
                  options={gameSystemOptions}
                />

                <SelectField
                  label="Género"
                  id="genre"
                  value={room.genre}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRoom({ ...room, genre: e.target.value })
                  }
                  options={genreOptions}
                />

                <InputField
                  label="Game Master"
                  id="gameMaster"
                  value={room.gameMaster}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRoom({ ...room, gameMaster: e.target.value })
                  }
                  placeholder="Nombre del Game Master"
                />

                <SelectField
                  label="Estado"
                  id="status"
                  value={room.status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRoom({ ...room, status: e.target.value })
                  }
                  options={statusOptions}
                />
              </div>
            </Section>

            {/* Configuración de Jugadores */}
            <Section title="Configuración de Jugadores" icon={Users}>
              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Jugadores Actuales"
                  id="currentPlayers"
                  value={room.currentPlayers}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRoom({
                      ...room,
                      currentPlayers: parseInt(e.target.value) || 1,
                    })
                  }
                  min={1}
                  max={room.maxPlayers}
                  icon={User}
                />

                <NumberField
                  label="Jugadores Máximos"
                  id="maxPlayers"
                  value={room.maxPlayers}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRoom({
                      ...room,
                      maxPlayers: parseInt(e.target.value) || 5,
                    })
                  }
                  min={room.currentPlayers}
                  max={10}
                  icon={Users}
                />
              </div>

              <div className="mt-4">
                <ToggleField
                  label="Sala Privada"
                  id="isPrivate"
                  value={room.isPrivate}
                  onChange={(checked: boolean) =>
                    setRoom({ ...room, isPrivate: checked })
                  }
                  icon={room.isPrivate ? Lock : Unlock}
                />
              </div>
            </Section>

            {/* Descripción */}
            <Section title="Descripción" icon={BookOpen}>
              <TextareaField
                label="Descripción de la Sala"
                id="description"
                value={room.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setRoom({ ...room, description: e.target.value })
                }
                rows={6}
                placeholder="Describe tu sala, la historia, reglas específicas, etc."
              />
            </Section>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            {/* Configuración de Sesión */}
            <Section title="Configuración de Sesión" icon={Calendar}>
              <div className="space-y-4">
                <InputField
                  label="Próxima Sesión"
                  id="nextSession"
                  type="datetime-local"
                  value={room.nextSession}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRoom({ ...room, nextSession: e.target.value })
                  }
                />

                <SelectField
                  label="Duración"
                  id="duration"
                  value={room.duration}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRoom({ ...room, duration: e.target.value })
                  }
                  options={durationOptions}
                />

                <SelectField
                  label="Dificultad"
                  id="difficulty"
                  value={room.difficulty}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRoom({ ...room, difficulty: e.target.value })
                  }
                  options={difficultyOptions}
                />
              </div>
            </Section>

            {/* Información de la Sala */}
            <Section title="Información de la Sala" icon={Star}>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    ID de la Sala:
                  </span>
                  <span className="text-sm text-gray-600">
                    {room.id || "Auto-generado"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Fecha de Creación:
                  </span>
                  <span className="text-sm text-gray-600">
                    {room.createdAt || new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Estado:
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${room.status === "active"
                      ? "bg-green-100 text-green-800"
                      : room.status === "recruiting"
                        ? "bg-blue-100 text-blue-800"
                        : room.status === "full"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {statusOptions.find((opt) => opt.value === room.status)
                      ?.label || room.status}
                  </span>
                </div>
              </div>
            </Section>

            {/* Resumen */}
            <Section title="Resumen" icon={Eye}>
              <div className="space-y-3">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    {room.name || "Nombre de la Sala"}
                  </h4>
                  <p className="text-sm text-purple-700 mb-2">
                    <strong>Sistema:</strong>{" "}
                    {room.gameSystem || "No especificado"} |
                    <strong> Género:</strong> {room.genre || "No especificado"}
                  </p>
                  <p className="text-sm text-purple-700 mb-2">
                    <strong>Jugadores:</strong> {room.currentPlayers}/
                    {room.maxPlayers} |<strong> GM:</strong>{" "}
                    {room.gameMaster || "No especificado"}
                  </p>
                  <p className="text-sm text-purple-700">
                    <strong>Dificultad:</strong>{" "}
                    {difficultyOptions.find(
                      (opt) => opt.value === room.difficulty
                    )?.label || "No especificado"}{" "}
                    |<strong> Duración:</strong>{" "}
                    {room.duration || "No especificado"}
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Sparkles size={18} />
            Generar Nueva Sala
          </button>
          <button
            onClick={() => console.log("Guardando sala:", room)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Crear Sala
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
