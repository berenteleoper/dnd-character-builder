import { calculateModifier } from "./ability";
import { getArmorByName } from "./armor";
import { getFinalAbilities } from "./race";
import type { Character } from "../types/character";

export function calculateArmorClass(character: Character): number {
  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  const dexModifier = calculateModifier(finalAbilities.dexterity);
  const armor = getArmorByName(character.armor);

  let dexBonus = 0;

  if (armor.dexModifier === "full") {
    dexBonus = dexModifier;
  }

  if (armor.dexModifier === "max2") {
    dexBonus = Math.min(dexModifier, 2);
  }

  if (armor.dexModifier === "none") {
    dexBonus = 0;
  }

  const shieldBonus = character.hasShield ? 2 : 0;

  return armor.baseAc + dexBonus + shieldBonus;
}

export function calculateInitiative(character: Character): number {
  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  return calculateModifier(finalAbilities.dexterity);
}