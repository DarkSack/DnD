export const getClassColor = (className: string) => {
  switch (className) {
    case "Barbarian":
      return "bg-red-500";
    case "Bard":
      return "bg-green-500";
    case "Cleric":
      return "bg-blue-500";
    case "Druid":
      return "bg-purple-500";
    case "Fighter":
      return "bg-yellow-500";
    case "Monk":
      return "bg-orange-500";
    case "Paladin":
      return "bg-pink-500";
    case "Ranger":
      return "bg-cyan-500";
    case "Rogue":
      return "bg-indigo-500";
    case "Sorcerer":
      return "bg-teal-500";
    case "Warlock":
      return "bg-gray-500";
    case "Wizard":
      return "bg-black-500";
    default:
      return "bg-gray-500";
  }
};

export const getClassIcon = (className: string) => {
  switch (className) {
    case "Barbarian":
      return "Sword";
    case "Bard":
      return "Music";
    case "Cleric":
      return "Cross";
    case "Druid":
      return "Tree";
    case "Fighter":
      return "Shield";
    case "Monk":
      return "Dagger";
    case "Paladin":
      return "Shield";
    case "Ranger":
      return "Tree";
    case "Rogue":
      return "Music";
    case "Sorcerer":
      return "Magic";
    case "Warlock":
      return "Potion";
    case "Wizard":
      return "Magic";
    default:
      return "Sword";
  }
};
