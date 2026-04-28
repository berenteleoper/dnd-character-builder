import type { AbilityName } from "../types/character";

export type Race = {
  name: string;
  bonuses: Partial<Record<AbilityName, number>>;
  traits: string[];
};

export const races: Race[] = [
  {
    name: "Human",
    bonuses: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },
    traits: ["Extra Language"]
  },
  {
    name: "Dwarf",
    bonuses: {
      constitution: 2,
    },
    traits: ["Darkvision", "Dwarven Resilience", "Dwarwen Combat Training", "Stonecunning"]
  },
  {
    name: "Elf",
    bonuses: {
      dexterity: 2,
    },
    traits: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"]
  },
  {
    name: "Halfling",
    bonuses: {
      dexterity: 2,
    },
    traits: ["Lucky", "Brave", "Halfling Nimbleness"]
  },
  {
    name: "Dragonborn",
    bonuses: {
      strength: 2,
      charisma: 1,
    },
    traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"]
  },
  {
    name: "Gnome",
    bonuses: {
      intelligence: 2,
    },
    traits: ["Darkvision", "Gnome Cunning"]
  },
  {
    name: "Half-Elf",
    bonuses: {
      charisma: 2,
    },
    traits: ["+1 to Two Other Ability Scores", "Darkvision", "Fey Ancestry", "Skill Versatility"]
  },
  {
    name: "Half-Orc",
    bonuses: {
      strength: 2,
      constitution: 1,
    },
    traits: ["Darkvision", "Menacing", "Relentless"]
  },
  {
    name: "Tiefling",
    bonuses: {
      intelligence: 1,
      charisma: 2,
    },
    traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"]
  },
  {
    name: "Aasimar",
    bonuses: {
      charisma: 2,
    },
    traits: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer"]
  },
  {
    name: "Bugbear",
    bonuses: {
      dexterity: 1,
      strength: 2,
    },
    traits: ["Darkvision", "Long-Limbed", "Powerful Build", "Sneaky", "Surprise Attack"]
  },
  {
    name: "Firbolg",
    bonuses: {
      wisdom: 2,
      strength: 1,
    },
    traits: ["Firbolg Magic", "Hidden Step", "Powerful Build", "Speech of Beast and Leaf"]
  },
  {
    name: "Goblin",
    bonuses: {
      dexterity: 2,
      constitution: 1,
    },
    traits: ["Darkvision", "Fury of the Small", "Nimble Escape"]
  },
  {
    name: "Hobgoblin",
    bonuses: {
      intelligence: 1,
      constitution: 2
    },
    traits: ["Darkvision", "Martial Training", "Saving Face"]
  },
  {
    name: "Kenku",
    bonuses: {
      dexterity: 2,
      wisdom: 1,
    },
    traits: ["Expert Forgery", "Kenku Training", "Mimicry"]
  },
  {
    name: "Kobold",
    bonuses: {
      dexterity: 2,
    },
    traits: ["Darkvision", "Grovel", "Cower and Beg", "Pack Tactics", "Sunlight Sensitivity"]
  },
  {
    name: "Lizardfolk",
    bonuses: {
      constitution: 2,
      wisdom: 1,
    },
    traits: ["Bite", "Cunning Artisan", "Hold Breath", "Hunter's Lore", "Natural Armor", "Hungry Jaws"]
  },
  {
    name: "Orcs",
    bonuses: {
      strength: 2,
      constitution: 1,
    },
    traits: ["Darkvision", "Aggressive", "Primal Intuition", "Powerful Build"]
  },
  {
    name: "Tabaxi",
    bonuses: {
      dexterity: 2,
      charisma: 1,
    },
    traits: ["Darkvision", "Feline Agility", "Cat's Claws", "Cat's Talents"]
  },
  {
    name: "Triton",
    bonuses: {
      strength: 1,
      constitution: 1,
      charisma: 1,
    },
    traits: ["Amphibious", "Control Air and Water", "Emissary of the Sea"]
  },
  {
    name: "Yuan-ti",
    bonuses: {
      charisma: 2,
      intelligence: 1,
    },
    traits: ["Darkvision", "Innate Spellcasting", "Magic Resistance", "Poison Immunity"]
  },
  {
    name: "Aarakocra",
    bonuses: {
      dexterity: 2,
      wisdom: 1,
    },
    traits: ["Flight", "Talons"]
  },
  {
    name: "Genasi",
    bonuses: {
      constitution: 2,
    },
    traits: ["Air, Earth, Fire, Water Subraces"]
  },
  {
    name: "Goliath",
    bonuses: {
      strength: 2,
      constitution: 1,
    },
    traits: ["Natural Athlete", "Stone's Endurance", "Powerful Build", "Mountain Born"]
  },
];