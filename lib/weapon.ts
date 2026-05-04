import { weapons } from "../data/weapons";
import { calculateModifier } from "./ability";
import { getCharacterClass } from "./classes";
import { calculateProficiencyBonus } from "./level";
import { getFinalAbilities } from "./race";
import type { Character } from "../types/character";

export function getWeaponByName(name: string) {
  return weapons.find((w) => w.name === name) ?? weapons[0];
}

export function isWeaponProficient(className: string, weaponName: string) {
  const selectedClass = getCharacterClass(className);
  const weapon = getWeaponByName(weaponName);

  if (!selectedClass) return false;
  if (weapon.name === "None") return true;

  if (weapon.category === "simple") {
    return selectedClass.weaponProficiencies.includes("Simple Weapons");
  }

  if (weapon.category === "martial") {
    return selectedClass.weaponProficiencies.includes("Martial Weapons");
  }

  return false;
}

export function calculateWeaponAttackBonus(character: Character): number {
  const weapon = getWeaponByName(character.weapon ?? "None");

  if (weapon.name === "None") return 0;

  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  const abilityModifier = calculateModifier(finalAbilities[weapon.ability]);
  const proficiencyBonus = calculateProficiencyBonus(character.level);

  const isProficient = isWeaponProficient(character.class, weapon.name);

  return isProficient ? abilityModifier + proficiencyBonus : abilityModifier;
}

export function calculateWeaponDamageBonus(character: Character): number {
  const weapon = getWeaponByName(character.weapon ?? "None");

  if (weapon.name === "None") return 0;

  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  return calculateModifier(finalAbilities[weapon.ability]);
}