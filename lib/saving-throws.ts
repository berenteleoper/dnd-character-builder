import { calculateModifier } from "./ability";
import { getCharacterClass } from "./classes";
import { calculateProficiencyBonus } from "./level";
import { getFinalAbilities } from "./race";
import type { AbilityName, Character } from "../types/character";

export function calculateSavingThrow(
  character: Character,
  abilityKey: AbilityName
): number {
  const selectedClass = getCharacterClass(character.class);

  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  const abilityModifier = calculateModifier(finalAbilities[abilityKey]);
  const proficiencyBonus = calculateProficiencyBonus(character.level);

  const isProficient =
    selectedClass?.savingThrows.includes(abilityKey) ?? false;

  return isProficient
    ? abilityModifier + proficiencyBonus
    : abilityModifier;
}