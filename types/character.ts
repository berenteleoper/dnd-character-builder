export type AbilityGenerationMethod = "manual" | "standardArray" | "diceRoll" | "pointBuy";

export type StandardArrayValue = 15 | 14 | 13 | 12 | 10 | 8;

export type Ruleset = "2014" | "2024";

export type AbilityName = 
| "strength"
| "dexterity"
| "constitution"
| "intelligence"
| "wisdom"
| "charisma";

export type AbilityScores = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
};

export type Character = {
    id: string;
    name: string;
    race: string;
    subrace: string;
    class: string;
    level: number;
    ruleset: Ruleset;
    generationMethod: AbilityGenerationMethod;
    standardArrayAssignments?: Partial<Record<AbilityName, StandardArrayValue>>;
    avatarUrl: string;
    armor: string;
    hasShield: boolean;
    abilities: AbilityScores;
    weapon: string;
}

