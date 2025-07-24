import { useState, useEffect, useRef } from "react";
import {
    Plus, Phone, Video, MoreVertical, Paperclip, Smile, Send, MessageCircle, X
} from "lucide-react";
import useStore from "@/hooks/useStore";
import type { ChatInterface } from "@/Interfaces/Social";
export default function Chat() {
    const { chats, setChats, messages, setMessages } = useStore();
    const [activeChat, setActiveChat] = useState<ChatInterface | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [showNewGroupModal, setShowNewGroupModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChat]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;

        if (typeof activeChat.id !== 'number') return;

        const message = {
            id: Date.now(),
            sender: { id: 1, username: "Yo", avatar: "👤" },
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: "text"
        };

        setMessages(prev => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), message]
        }));

        setChats(prev => prev.map(chat =>
            chat.id === activeChat.id
                ? { ...chat, lastMessage: newMessage, timestamp: "ahora" }
                : chat
        ));

        setNewMessage("");
    };

    const handleCreateGroup = () => {
        if (!newGroupName.trim()) return;

        const newGroup = {
            id: Date.now(),
            name: newGroupName,
            type: "group" as const,
            avatar: "👥",
            lastMessage: "Grupo creado",
            timestamp: "ahora",
            unread: 0,
            participants: [1]
        };

        setChats(prev => [...prev, newGroup]);
        setMessages(prev => ({
            ...prev,
            [newGroup.id]: [{
                id: Date.now(),
                sender: { id: 0, username: "Sistema", avatar: "🤖" },
                content: `¡Bienvenido al grupo "${newGroupName}"!`,
                timestamp: "ahora",
                type: "system"
            }]
        }));

        setNewGroupName("");
        setShowNewGroupModal(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-[635px] flex flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
            <div className="flex h-full">
                {/* Lista de Chats */}
                <div className="w-80 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chats</h2>
                            <button
                                onClick={() => setShowNewGroupModal(true)}
                                className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors dark:text-white"
                                title="Crear grupo"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Lista scrolleable de chats */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {chats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat)}
                                className={`p-4 cursor-pointer dark:bg-gray-800 dark:text-white border-b border-gray-100 hover:bg-gray-50 transition-colors ${activeChat?.id === chat.id ? 'bg-purple-50 dark:bg-gray-700 dark:text-white border-purple-200' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-3 dark:text-white">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                                            {chat.avatar}
                                        </div>
                                        {chat.unread > 0 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                                {chat.unread}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium dark:text-white text-gray-900 truncate">{chat.name}</h3>
                                            <span className="text-xs text-gray-500">{chat.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Área de Chat */}
                <div className="flex-1 flex flex-col">
                    {activeChat ? (
                        <>
                            {/* Header del Chat */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                                            {activeChat.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900    ">{activeChat.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {activeChat.type === 'group' ? `${activeChat.participants.length} miembros` : 'En línea'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Phone size={16} />
                                        </button>
                                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Video size={16} />
                                        </button>
                                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Área de Mensajes */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {(messages[activeChat.id] || []).map(message => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender.id === 1 ? 'justify-end' : 'justify-start'} dark:bg-gray-900 dark:text-white`}
                                    >
                                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.sender.id === 1
                                            ? 'bg-purple-600 text-white rounded-br-md'
                                            : message.type === 'system'
                                                ? 'bg-gray-100 text-gray-600 text-center rounded-full'
                                                : 'bg-gray-100 text-gray-900 rounded-bl-md'
                                            } dark:bg-gray-700 dark:text-white`}>
                                            {message.sender.id !== 1 && message.type !== 'system' && (
                                                <p className="text-xs text-gray-500 mb-1 font-medium">{message.sender.username}</p>
                                            )}
                                            <p className="text-sm leading-relaxed">{message.content}</p>
                                            <p className={`text-xs mt-1 ${message.sender.id === 1 ? 'text-purple-200' : 'text-gray-500'
                                                }`}>
                                                {message.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input de Mensaje */}
                            <div className="p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:text-white">
                                <div className="flex items-center gap-3">
                                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Paperclip size={18} />
                                    </button>
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Escribe un mensaje..."
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 dark:text-white"
                                    />
                                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Smile size={18} />
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                        className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
                                <p className="text-lg font-medium">Selecciona un chat para comenzar</p>
                                <p className="text-sm text-gray-400 mt-1">Elige una conversación de la lista</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Nuevo Grupo */}
            {showNewGroupModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:bg-gray-900 dark:text-white">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 dark:bg-gray-900 dark:text-white">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Crear Nuevo Grupo</h3>
                            <button
                                onClick={() => setShowNewGroupModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <input
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateGroup()}
                            placeholder="Nombre del grupo"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-6"
                            autoFocus
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowNewGroupModal(false)}
                                className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateGroup}
                                disabled={!newGroupName.trim()}
                                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Crear Grupo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}