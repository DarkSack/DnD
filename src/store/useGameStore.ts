import type { GameEvent, GameStore, Player } from "@/Interfaces/Game";
import { create } from "zustand";

const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  currentTurn: 0,
  isDMView: false,
  events: [],
  activePlayerId: null, // Nuevo campo para el ID del jugador activo

  addPlayer: (name: string) => {
    const classes = [
      "Guerrero",
      "Mago",
      "Pícaro",
      "Clérigo",
      "Paladín",
      "Bárbaro",
      "Explorador",
      "Bardo",
    ];
    const newPlayer: Player = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      class: classes[Math.floor(Math.random() * classes.length)],
      attributes: {
        fuerza: Math.floor(Math.random() * 6) + 10,
        destreza: Math.floor(Math.random() * 6) + 10,
        constitucion: Math.floor(Math.random() * 6) + 10,
        inteligencia: Math.floor(Math.random() * 6) + 10,
        sabiduria: Math.floor(Math.random() * 6) + 10,
        carisma: Math.floor(Math.random() * 6) + 10,
      },
      currentHP: 100,
      maxHP: 100,
      initiative: 0,
      isActive: false,
      position: { x: 0, y: 0 },
    };
    set((state) => ({
      players: [...state.players, newPlayer],
    }));
  },

  removePlayer: (id: string) => {
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
      activePlayerId: state.activePlayerId === id ? null : state.activePlayerId,
    }));
  },

  updatePlayerHP: (id: string, newHP: number) => {
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id
          ? { ...p, currentHP: Math.max(0, Math.min(newHP, p.maxHP)) }
          : p
      ),
    }));
  },

  setActivePlayer: (playerId: string | null) => {
    set((state) => ({
      activePlayerId: playerId,
      players: state.players.map((p) => ({
        ...p,
        isActive: p.id === playerId,
      })),
      currentTurn: playerId
        ? state.players.findIndex((p) => p.id === playerId)
        : state.currentTurn,
    }));
  },

  nextTurn: () => {
    const { players } = get();
    if (players.length === 0) return;
    set((state) => {
      const nextTurn = (state.currentTurn + 1) % players.length;
      const nextActivePlayer = players[nextTurn];
      return {
        currentTurn: nextTurn,
        activePlayerId: nextActivePlayer.id,
        players: players.map((p) => ({
          ...p,
          isActive: p.id === nextActivePlayer.id,
        })),
      };
    });
  },

  rollInitiative: () => {
    set((state) => {
      const playersWithInitiative = state.players
        .map((p) => ({
          ...p,
          initiative: Math.floor(Math.random() * 20) + 1,
          isActive: false,
        }))
        .sort((a, b) => b.initiative - a.initiative);

      const firstPlayer =
        playersWithInitiative.length > 0 ? playersWithInitiative[0] : null;
      if (firstPlayer) {
        firstPlayer.isActive = true;
      }

      return {
        players: playersWithInitiative,
        currentTurn: 0,
        activePlayerId: firstPlayer ? firstPlayer.id : null,
      };
    });
    get().addEvent(
      "Los dados del destino han sido lanzados... que los dioses decidan el orden de batalla",
      "system"
    );
  },

  toggleDMView: () => {
    set((state) => ({ isDMView: !state.isDMView }));
  },

  addEvent: (message: string, type: GameEvent["type"]) => {
    const newEvent: GameEvent = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      timestamp: new Date(),
      type,
    };
    set((state) => ({
      events: [newEvent, ...state.events].slice(0, 50),
    }));
  },
}));

export { useGameStore };
