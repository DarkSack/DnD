interface Attributes {
  fuerza: number;
  destreza: number;
  constitucion: number;
  inteligencia: number;
  sabiduria: number;
  carisma: number;
}
interface Player {
  id: string;
  name: string;
  attributes: Attributes;
  currentHP: number;
  maxHP: number;
  initiative: number;
  isActive: boolean;
  class: string;
}
interface GameEvent {
  id: string;
  message: string;
  timestamp: Date;
  type: "combat" | "narrative" | "system" | "loot";
}
interface GameStore {
  players: Player[];
  currentTurn: number;
  events: GameEvent[];
  activePlayerId: string | null;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerHP: (id: string, newHP: number) => void;
  nextTurn: () => void;
  rollInitiative: () => void;
  addEvent: (message: string, type: GameEvent["type"]) => void;
  setActivePlayer: (id: string) => void;
}




export type { Attributes, Player, GameEvent, GameStore };
