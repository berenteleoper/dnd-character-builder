export type AbilityGenerationMethod = "manual" | "standardArray" | "diceRoll";

export type StandardArrayValue = 15 | 14 | 13 | 12 | 10 | 8;

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
    class: string;
    level: number;
    generationMethod: AbilityGenerationMethod;
    abilities: AbilityScores;
    standardArrayAssignments?: Partial<Record<AbilityName, StandardArrayValue>>;
}

