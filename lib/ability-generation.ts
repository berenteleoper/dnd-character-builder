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

export const ponitBuyCosts: Record<number, number> = {
  8: 0,
  0: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export const pointBuyValues = [8, 9, 10, 11, 12, 13, 14, 15];

export const POINT_BUY_MAX_POINTS = 27;

export function calculatePointBuyCost(abilities: AbilityScores): number {
  return Object.values(abilities).reduce((total, score) => {
    return total + (ponitBuyCosts[score] ?? 0);
  }, 0);
}

export function getPointBuyRemainingPoints(abilities: AbilityScores): number {
  return POINT_BUY_MAX_POINTS - calculatePointBuyCost(abilities);
}

export function getDefaultPointBuyAbilities(): AbilityScores {
  return {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
  };
}