import type { AbilityName } from "../types/character";

export type Subrace = {
    name: string;
    bonuses: Partial<Record<AbilityName, number>>;
    traits: string[];
};

export type Race = {
    name: string;
    bonuses: Partial<Record<AbilityName, number>>;
    traits: string[];
    subraces?: Subrace[];
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
        traits: ["Darkvision", "Dwarven Resilience", "Dwarwen Combat Training", "Stonecunning"],
        subraces: [
            {
                name: "Hill Dwarf",
                bonuses: {
                    wisdom: 1,
                },
                traits: ["Dwarven Toughness"],
            },
            {
                name: "Mountain Dwarf",
                bonuses: {
                    strength: 2,
                },
                traits: ["Dwarven Armor Training"],
            },
        ],
    },
    {
        name: "Elf",
        bonuses: {
            dexterity: 2,
        },
        traits: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
        subraces: [
            {
                name: "High Elf",
                bonuses: {
                    intelligence: 1,
                },
                traits: ["Elf Weapon Training", "Cantrip", "Extra Language"],
            },
            {
                name: "Wood Elf",
                bonuses: {
                    wisdom: 1,
                },
                traits: ["Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"],
            },
            {
                name: "Drow",
                bonuses: {
                    charisma: 1,
                },
                traits: ["Superior Darkvision", "Sunlight Sensitivity", "Drow Magic", "Drow Weapon Training"],
            },
        ],
    },
    {
        name: "Halfling",
        bonuses: {
            dexterity: 2,
        },
        traits: ["Lucky", "Brave", "Halfling Nimbleness"],
        subraces: [
            {
                name: "Lightfoot Halfling",
                bonuses: {
                    charisma: 1,
                },
                traits: ["Naturally Stealthy"],
            },
            {
                name: "Stout Halfling",
                bonuses: {
                    constitution: 1,
                },
                traits: ["Stout Resilience"],
            },
        ],
    },
    {
        name: "Dragonborn",
        bonuses: {
            strength: 2,
            charisma: 1,
        },
        traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
        subraces: [
            {
                name: "Black Dragonborn",
                bonuses: {},
                traits: ["Acid Breath", "Acid Resistance"],
            },
            {
                name: "Blue Dragonborn",
                bonuses: {},
                traits: ["Lightning Breath", "Lightning Resistance"],
            },
            {
                name: "Red Dragonborn",
                bonuses: {},
                traits: ["Fire Breath", "Fire Resistance"],
            },
            {
                name: "White Dragonborn",
                bonuses: {},
                traits: ["Cold Breath", "Cold Resistance"],
            },
            {
                name: "Green Dragonborn",
                bonuses: {},
                traits: ["Poison Breath", "Poison Resistance"],
            },
        ],
    },
    {
        name: "Gnome",
        bonuses: {
            intelligence: 2,
        },
        traits: ["Darkvision", "Gnome Cunning"],
        subraces: [
            {
                name: "Forest Gnome",
                bonuses: {
                    dexterity: 1,
                },
                traits: ["Natural Illusionist", "Speak with Small Beasts"],
            },
            {
                name: "Rock Gnome",
                bonuses: {
                    constitution: 1,
                },
                traits: ["Artificer's Lore", "Tinker"],
            },
        ],
    },
    {
        name: "Half-Elf",
        bonuses: {
            charisma: 2,
        },
        traits: ["+1 to Two Other Ability Scores", "Darkvision", "Fey Ancestry", "Skill Versatility"],
        subraces: [
            {
                name: "High Half-Elf",
                bonuses: {
                    intelligence: 1,
                },
                traits: ["Cantrip"],
            },
            {
                name: "Wood Half-Elf",
                bonuses: {
                    wisdom: 1,
                },
                traits: ["Fleet of Foot", "Mask of the Wild"],
            },
            {
                name: "Drow Half-Elf",
                bonuses: {
                    charisma: 1,
                },
                traits: ["Drow Magic"],
            },
        ],
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
        traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
        subraces: [
            {
                name: "Asmodeus Tiefling",
                bonuses: {
                    intelligence: 1,
                },
                traits: ["Infernal Legacy"],
            },
            {
                name: "Mephistopheles Tiefling",
                bonuses: {
                    intelligence: 1,
                },
                traits: ["Mage Hand", "Burning Hands", "Flame Blade"],
            },
            {
                name: "Zariel Tiefling",
                bonuses: {
                    strength: 1,
                },
                traits: ["Thaumaturgy", "Searing Smite", "Branding Smite"],
            },
        ],
    },
    {
        name: "Aasimar",
        bonuses: {
            charisma: 2,
        },
        traits: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer"],
        subraces: [
            {
                name: "Protector Aasimar",
                bonuses: {},
                traits: ["Radiant Soul"],
            },
            {
                name: "Scourge Aasimar",
                bonuses: {},
                traits: ["Radiant Consumption"],
            },
            {
                name: "Fallen Aasimar",
                bonuses: {},
                traits: ["Necrotic Shroud"],
            },
        ],
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
        traits: ["Darkvision", "Aggressive", "Primal Intuition", "Powerful Build"],
        subraces: [
            {
                name: "Gray Orc",
                bonuses: {},
                traits: ["Aggressive"],
            },
        ],
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
        traits: ["Darkvision", "Innate Spellcasting", "Magic Resistance", "Poison Immunity"],
        subraces: [
            {
                name: "Pureblood",
                bonuses: {},
                traits: ["Magic Resistance", "Poison Immunity"],
            },
        ],
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
        traits: [],
        subraces: [
            {
                name: "Air Genasi",
                bonuses: {
                    dexterity: 1,
                },
                traits: ["Unending Breath", "Mingle with the Wind"],
            },
            {
                name: "Earth Genasi",
                bonuses: {
                    strength: 1,
                },
                traits: ["Earth Walk", "Merge with Stone"],
            },
            {
                name: "Fire Genasi",
                bonuses: {
                    intelligence: 1,
                },
                traits: ["Darkvision", "Reach to the Blaze"],
            },
            {
                name: "Water Genasi",
                bonuses: {
                    wisdom: 1,
                },
                traits: ["Amphibious", "Swim Speed", "Call to the Wave"],
            },
        ],
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