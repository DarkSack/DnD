interface ChatInterface {
  id: number;
  name: string;
  type: "direct" | "group";
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  participants: number[];
}

interface Request {
  id: number;
  sender: string;
  timestamp: string;
  from:{
    id: number;
    username: string;
    avatar: string;
  }
}
export type { ChatInterface, Request };
