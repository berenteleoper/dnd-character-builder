export type ClassTheme = {
    primary: string;
    border: string;
    soft: string;
    panel: string;
    text: string;
};

export const classThemes: Record<string, ClassTheme> = {
  Fighter: {
    primary: "#9f2f2f",
    border: "#7f1d1d",
    soft: "#f4d8d8",
    panel: "#f7efe4",
    text: "#3a1f1f",
  },
  Rogue: {
    primary: "#6b3fa0",
    border: "#4c1d75",
    soft: "#eadcf7",
    panel: "#f7efe4",
    text: "#2f213d",
  },
  Cleric: {
    primary: "#b68a1f",
    border: "#8f6a10",
    soft: "#f6edc7",
    panel: "#f7efe4",
    text: "#3f3115",
  },
  Druid: {
    primary: "#467a43",
    border: "#2f5a2d",
    soft: "#dcefd9",
    panel: "#f7efe4",
    text: "#20351f",
  },
  Wizard: {
    primary: "#3f5fa8",
    border: "#243f7a",
    soft: "#dce5f7",
    panel: "#f7efe4",
    text: "#1d2b45",
  },
  Warlock: {
    primary: "#6d3b7f",
    border: "#4a2359",
    soft: "#ead9ef",
    panel: "#f7efe4",
    text: "#2f1d35",
  },
  Barbarian: {
    primary: "#8f2d1f",
    border: "#6f1c12",
    soft: "#f3d8d2",
    panel: "#f7efe4",
    text: "#3d1f19",
  },
  Paladin: {
    primary: "#b6902d",
    border: "#8f6f1f",
    soft: "#f5ebcf",
    panel: "#f7efe4",
    text: "#3e3119",
  },
  Ranger: {
    primary: "#5b7a35",
    border: "#415724",
    soft: "#e5edd8",
    panel: "#f7efe4",
    text: "#28351c",
  },
  Bard: {
    primary: "#a03f73",
    border: "#7b2553",
    soft: "#f4d9e8",
    panel: "#f7efe4",
    text: "#421e34",
  },
  Monk: {
    primary: "#b86a2a",
    border: "#8e4d18",
    soft: "#f5dfcd",
    panel: "#f7efe4",
    text: "#40261a",
  },
  Sorcerer: {
    primary: "#5f46a8",
    border: "#402f7a",
    soft: "#e1dcf7",
    panel: "#f7efe4",
    text: "#2a2143",
  },
};

export function getClassTheme(characterClass: string): ClassTheme {
  return classThemes[characterClass] ?? {
    primary: "#9f2f2f",
    border: "#7f1d1d",
    soft: "#f4d8d8",
    panel: "#f7efe4",
    text: "#3a1f1f",
  };
}