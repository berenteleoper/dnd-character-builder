import { races } from "../data/races";
import type { AbilityName, AbilityScores } from "../types/character";

export function getRaceBonuses(raceName: string) {
    const race = races.find((race) => race.name === raceName);
    return race?.bonuses ?? {};
}

export function getRaceTraits(raceName: string): string[] {
    const race = races.find((race) => race.name === raceName);
    return race?.traits ?? [];
}

export function getFinalAbilityScore(
    abilityKey: AbilityName,
    baseAbilities: AbilityScores,
    raceName: string
): number {
    const bonuses = getRaceBonuses(raceName);

    return baseAbilities[abilityKey] + (bonuses[abilityKey] ?? 0);
}

export function getFinalAbilities(
    baseAbilities: AbilityScores,
    raceName: string
): AbilityScores {
    return {
        strength: getFinalAbilityScore("strength", baseAbilities, raceName),
        dexterity: getFinalAbilityScore("dexterity", baseAbilities, raceName),
        constitution: getFinalAbilityScore("constitution", baseAbilities, raceName),
        intelligence: getFinalAbilityScore("intelligence", baseAbilities, raceName),
        wisdom: getFinalAbilityScore("wisdom", baseAbilities, raceName),
        charisma: getFinalAbilityScore("charisma", baseAbilities, raceName),
    };
}