import { calculateModifier } from "./ability";
import { getCharacterClass } from "./classes";
import { calculateProficiencyBonus } from "./level";
import { getFinalAbilities } from "./race";
import type { Character } from "../types/character";

export function isSpellcaster(character: Character): boolean {
  const selectedClass = getCharacterClass(character.class);
  return selectedClass?.isSpellcaster ?? false;
}

export function getSpellcastingAbility(character: Character) {
  const selectedClass = getCharacterClass(character.class);
  return selectedClass?.spellcastingAbility;
}

export function calculateSpellSaveDc(character: Character): number | null {
  const spellcastingAbility = getSpellcastingAbility(character);

  if (!spellcastingAbility) return null;

  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  const abilityModifier = calculateModifier(finalAbilities[spellcastingAbility]);
  const proficiencyBonus = calculateProficiencyBonus(character.level);

  return 8 + proficiencyBonus + abilityModifier;
}

export function calculateSpellAttackBonus(character: Character): number | null {
  const spellcastingAbility = getSpellcastingAbility(character);

  if (!spellcastingAbility) return null;

  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  const abilityModifier = calculateModifier(finalAbilities[spellcastingAbility]);
  const proficiencyBonus = calculateProficiencyBonus(character.level);

  return abilityModifier + proficiencyBonus;
}