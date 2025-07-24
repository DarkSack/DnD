interface GameStore {
  players: Player[];
  currentTurn: number;
  isDMView: boolean;
  events: Event[];
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerHP: (id: string, newHP: number) => void;
  nextTurn: () => void;
  rollInitiative: () => void;
  toggleDMView: () => void;
  addEvent: (message: string, type: string) => void;
  activePlayerId: string | null;
  setActivePlayer: (playerId: string | null) => void;
}

interface Player {
  id: string;
  name: string;
  class: string;
  attributes: {
    fuerza: number;
    destreza: number;
    constitucion: number;
    inteligencia: number;
    sabiduria: number;
    carisma: number;
  };
  maxHP: number;
  currentHP: number;
  initiative: number;
  isActive: boolean;
  position: { x: number; y: number };
}

interface Event {
  id: string;
  message: string;
  type: string;
  timestamp: Date;
}

interface GameEvent {
  id: string;
  message: string;
  type: string;
  timestamp: Date;
}

interface PlayerCardProps {
  player: Player;
  isDMView: boolean;
  currentPlayerId?: string;
}

interface PlayerState {
  updatePlayerHP: (playerId: string, newHP: number) => void;
}

interface HPBarProps {
  current: number;
  max: number;
}

interface AttributeDisplayProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

export type {
  GameStore,
  Player,
  Event,
  GameEvent,
  PlayerCardProps,
  PlayerState,
  HPBarProps,
  AttributeDisplayProps,
};
