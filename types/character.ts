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
    abilities: AbilityScores;
}