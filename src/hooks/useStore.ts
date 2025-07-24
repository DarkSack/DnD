import type { ChatInterface } from "@/Interfaces/Social";
import { useState } from "react";

const useStore = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "AlexGamer",
      email: "alex@example.com",
      avatar: "🎮",
      status: "online",
      isFriend: false,
      isBlocked: false,
    },
    {
      id: 2,
      username: "MysticMage",
      email: "magic@example.com",
      avatar: "🧙",
      status: "away",
      isFriend: true,
      isBlocked: false,
    },
    {
      id: 3,
      username: "DragonSlayer",
      email: "dragon@example.com",
      avatar: "⚔️",
      status: "offline",
      isFriend: false,
      isBlocked: false,
    },
    {
      id: 4,
      username: "ElvenArcher",
      email: "elf@example.com",
      avatar: "🏹",
      status: "online",
      isFriend: false,
      isBlocked: false,
    },
    {
      id: 5,
      username: "ShadowRogue",
      email: "shadow@example.com",
      avatar: "🗡️",
      status: "busy",
      isFriend: false,
      isBlocked: false,
    },
  ]);

  const [friendRequests, setFriendRequests] = useState([
    {
      id: 1,
      from: { id: 6, username: "NobleKnight", avatar: "🛡️" },
      timestamp: "2 min ago",
    },
    {
      id: 2,
      from: { id: 7, username: "WiseWizard", avatar: "📚" },
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      from: { id: 8, username: "BardSinger", avatar: "🎵" },
      timestamp: "3 hours ago",
    },
  ]);

  const [chats, setChats] = useState<ChatInterface[]>([

  ]);

  interface Message {
    id: number;
    sender: {
      id: number;
      username: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    type: string;
  }

  interface MessagesState {
    [key: number]: Message[];
  }

  const [messages, setMessages] = useState<MessagesState>({
    1: [
      {
        id: 1,
        sender: { id: 2, username: "MysticMage", avatar: "🧙" },
        content: "¡Hola! ¿Cómo estás?",
        timestamp: "10:30 AM",
        type: "text",
      },
      {
        id: 2,
        sender: { id: 1, username: "Yo", avatar: "👤" },
        content: "¡Muy bien! Preparando mi personaje para la próxima sesión",
        timestamp: "10:32 AM",
        type: "text",
      },
      {
        id: 3,
        sender: { id: 2, username: "MysticMage", avatar: "🧙" },
        content: "¿Listo para la próxima sesión?",
        timestamp: "10:35 AM",
        type: "text",
      },
    ],
    2: [
      {
        id: 1,
        sender: { id: 4, username: "ElvenArcher", avatar: "🏹" },
        content: "¿Todos listos para mañana?",
        timestamp: "Yesterday",
        type: "text",
      },
      {
        id: 2,
        sender: { id: 5, username: "ShadowRogue", avatar: "🗡️" },
        content: "Sí, ya tengo todo preparado",
        timestamp: "Yesterday",
        type: "text",
      },
      {
        id: 3,
        sender: { id: 2, username: "MysticMage", avatar: "🧙" },
        content: "Nos vemos mañana a las 8pm",
        timestamp: "2 hours ago",
        type: "text",
      },
    ],
  });

  return {
    users,
    setUsers,
    friendRequests,
    setFriendRequests,
    chats,
    setChats,
    messages,
    setMessages,
  };
};

export default useStore;
