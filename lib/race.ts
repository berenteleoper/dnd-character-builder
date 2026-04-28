import { races } from "../data/races";
import type { AbilityName, AbilityScores } from "../types/character";

export function getRace(raceName: string) {
  return races.find((race) => race.name === raceName);
}

export function getSubrace(raceName: string, subraceName: string) {
  const race = getRace(raceName);
  return race?.subraces?.find((subrace) => subrace.name === subraceName);
}

export function getRaceBonuses(raceName: string) {
  const race = getRace(raceName);
  return race?.bonuses ?? {};
}

export function getSubraceBonuses(raceName: string, subraceName: string) {
  const subrace = getSubrace(raceName, subraceName);
  return subrace?.bonuses ?? {};
}

export function getCombinedRaceBonuses(raceName: string, subraceName: string) {
  const raceBonuses = getRaceBonuses(raceName);
  const subraceBonuses = getSubraceBonuses(raceName, subraceName);

  const combined: Partial<Record<AbilityName, number>> = {
    ...raceBonuses,
  };

  Object.entries(subraceBonuses).forEach(([abilityKey, bonus]) => {
    const key = abilityKey as AbilityName;
    combined[key] = (combined[key] ?? 0) + (bonus ?? 0);
  });

  return combined;
}

export function getFinalAbilityScore(
  abilityKey: AbilityName,
  baseAbilities: AbilityScores,
  raceName: string,
  subraceName: string
): number {
  const bonuses = getCombinedRaceBonuses(raceName, subraceName);

  return baseAbilities[abilityKey] + (bonuses[abilityKey] ?? 0);
}

export function getFinalAbilities(
  baseAbilities: AbilityScores,
  raceName: string,
  subraceName: string
): AbilityScores {
  return {
    strength: getFinalAbilityScore("strength", baseAbilities, raceName, subraceName),
    dexterity: getFinalAbilityScore("dexterity", baseAbilities, raceName, subraceName),
    constitution: getFinalAbilityScore("constitution", baseAbilities, raceName, subraceName),
    intelligence: getFinalAbilityScore("intelligence", baseAbilities, raceName, subraceName),
    wisdom: getFinalAbilityScore("wisdom", baseAbilities, raceName, subraceName),
    charisma: getFinalAbilityScore("charisma", baseAbilities, raceName, subraceName),
  };
}

export function getRaceTraits(raceName: string): string[] {
  const race = getRace(raceName);
  return race?.traits ?? [];
}

export function getSubraceTraits(raceName: string, subraceName: string): string[] {
  const subrace = getSubrace(raceName, subraceName);
  return subrace?.traits ?? [];
}

export function getCombinedRaceTraits(raceName: string, subraceName: string): string[] {
  return [
    ...getRaceTraits(raceName),
    ...getSubraceTraits(raceName, subraceName),
  ];
}