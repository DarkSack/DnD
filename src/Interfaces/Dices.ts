type DiceType = {
    id: string;
    name: string;
    sides: number;
    notation: string;
    description: string;
    commonUses: string[];
    examples: string[];
    color: string;
    icon: React.ElementType;
    rarity: "common" | "uncommon" | "rare";
    games: string[];
  };

  type ViewMode = "grid" | "list";

  interface FilterState {
    search: string;
    rarity: string;
    game: string;
  }

  export type {DiceType, ViewMode, FilterState};