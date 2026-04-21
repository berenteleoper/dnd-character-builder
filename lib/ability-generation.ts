import type {
  AbilityName,
  AbilityScores,
  StandardArrayValue,
} from "../types/character";

export const standardArray = [15, 14, 13, 12, 10, 8];

function rollDie(sides: number): number {
    return Math.floor(Math.random() * sides) + 1;
}

function roll4d6DropLowest(): number {
    const rolls = [rollDie(6), rollDie(6), rollDie(6), rollDie(6),];
    rolls.sort((a, b) => a - b);
    return rolls[1] + rolls[2] + rolls[3];
}

export function generateRolledAbilities(): AbilityScores {
    return {
        strength: roll4d6DropLowest(),
        dexterity: roll4d6DropLowest(),
        constitution: roll4d6DropLowest(),
        intelligence: roll4d6DropLowest(),
        wisdom: roll4d6DropLowest(),
        charisma: roll4d6DropLowest(),
    };
}

export function getStandardArrayAbilities(): AbilityScores {
  return {
    strength: 15,
    dexterity: 14,
    constitution: 13,
    intelligence: 12,
    wisdom: 10,
    charisma: 8,
  };
}

export function buildAbilitiesFromStandardArray(
  assignments: Partial<Record<AbilityName, StandardArrayValue>>
): AbilityScores {
  return {
    strength: assignments.strength ?? 8,
    dexterity: assignments.dexterity ?? 8,
    constitution: assignments.constitution ?? 8,
    intelligence: assignments.intelligence ?? 8,
    wisdom: assignments.wisdom ?? 8,
    charisma: assignments.charisma ?? 8,
  };
}

export const standardArrayValues: StandardArrayValue[] = [15, 14, 13, 12, 10, 8];