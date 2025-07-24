import { useState } from "react";
import {
    Users,
    UserPlus,
    MessageCircle,
    Shield,
    Search,
    Check,
    X,
    Loader2
} from "lucide-react";
import type { User } from "@/Interfaces/Auth";
import type { Request } from "@/Interfaces/Social";


const SocialList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const filteredUsers = users.filter((user: User) => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleSendFriendRequest = async (userId: string) => {
        setLoading(prev => ({ ...prev, [userId]: true }));
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUsers(prev => prev.map(user =>
            user.id === userId ? { ...user, pendingRequest: true } : user
        ));
        setLoading(prev => ({ ...prev, [userId]: false }));
    };

    const handleBlockUser = async (userId: string) => {
        setLoading(prev => ({ ...prev, [`block-${userId}`]: true }));
        await new Promise(resolve => setTimeout(resolve, 800));

        setUsers(prev => prev.map(user =>
            user.id === userId ? { ...user, isBlocked: true } : user
        ));
        setLoading(prev => ({ ...prev, [`block-${userId}`]: false }));
    };

    const handleSendMessage = (user: User) => {
        console.log('Enviando mensaje a:', user.username);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'busy': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:text-white">
            <div className="flex items-center gap-2 mb-6 dark:text-white">
                <Users size={20} className="text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Lista de Usuarios</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 dark:text-white">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar usuarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                    <option value="all">Todos</option>
                    <option value="online">En línea</option>
                    <option value="away">Ausente</option>
                    <option value="busy">Ocupado</option>
                    <option value="offline">Desconectado</option>
                </select>
            </div>

            <div className="space-y-3">
                {filteredUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                                    {user.avatar}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status || "offline")}`} />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 cursor-pointer">{user.username}</h3>
                                <p className="text-sm text-gray-500 cursor-pointer">{user.email}</p>
                                <p className="text-xs text-gray-400 capitalize cursor-pointer">{user.status}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {user.isBlocked ? (
                                <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                                    Bloqueado
                                </span>
                            ) : user.isFriend ? (
                                <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                                    Amigo
                                </span>
                            ) : user.pendingRequest ? (
                                <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full">
                                    Pendiente
                                </span>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSendFriendRequest(user.id)}
                                        disabled={loading[user.id]}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Enviar solicitud de amistad"
                                    >
                                        {loading[user.id] ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <UserPlus size={16} className="text-green-600 cursor-pointer" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleSendMessage(user)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Enviar mensaje"
                                    >
                                        <MessageCircle size={16} className="text-blue-600 cursor-pointer" />
                                    </button>
                                    <button
                                        onClick={() => handleBlockUser(user.id)}
                                        disabled={loading[`block-${user.id}`]}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Bloquear usuario"
                                    >
                                        {loading[`block-${user.id}`] ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Shield size={16} className="text-red-600 cursor-pointer" />
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No se encontraron usuarios</p>
                </div>
            )}
        </div>
    );
};

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const handleAcceptRequest = async (requestId: number) => {
        setLoading(prev => ({ ...prev, [`accept-${requestId}`]: true }));
        await new Promise(resolve => setTimeout(resolve, 1000));

        setFriendRequests(prev => prev.filter(req => req?.id !== requestId));
        setLoading(prev => ({ ...prev, [`accept-${requestId}`]: false }));
    };

    const handleRejectRequest = async (requestId: number) => {
        setLoading(prev => ({ ...prev, [`reject-${requestId}`]: true }));
        await new Promise(resolve => setTimeout(resolve, 800));

        setFriendRequests(prev => prev.filter(req => req?.id !== requestId));
        setLoading(prev => ({ ...prev, [`reject-${requestId}`]: false }));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:text-white">
            <div className="flex items-center gap-2 mb-6 dark:text-white">
                <UserPlus size={20} className="text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Solicitudes de Amistad</h2>
                {friendRequests.length > 0 && (
                    <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                        {friendRequests.length}
                    </span>
                )}
            </div>

            {friendRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <UserPlus size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No tienes solicitudes de amistad pendientes</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {friendRequests.map(request => (
                        <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                                    {request.from.avatar}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{request.from.username}</h3>
                                    <p className="text-sm text-gray-500">Te envió una solicitud de amistad</p>
                                    <p className="text-xs text-gray-400">{request.timestamp}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleAcceptRequest(request.id)}
                                    disabled={loading[`accept-${request.id}`]}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading[`accept-${request.id}`] ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Check size={16} />
                                    )}
                                    Aceptar
                                </button>
                                <button
                                    onClick={() => handleRejectRequest(request.id)}
                                    disabled={loading[`reject-${request.id}`]}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading[`reject-${request.id}`] ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <X size={16} />
                                    )}
                                    Rechazar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function SocialComponents() {
    const [activeTab, setActiveTab] = useState('users');

    const tabs = [
        { id: 'users', label: 'Usuarios', icon: Users },
        { id: 'requests', label: 'Solicitudes', icon: UserPlus },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
                        Panel Social
                    </h1>
                    <p className="text-gray-600">
                        Conecta con otros jugadores y forma tu grupo de aventureros
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1 dark:bg-gray-800 dark:text-white">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {activeTab === 'users' && <SocialList />}
                    {activeTab === 'requests' && <FriendRequests />}
                </div>
            </div>
        </div>
    );
}