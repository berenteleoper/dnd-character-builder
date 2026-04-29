import { calculateModifier } from "./ability";
import { getCharacterClass } from "./classes";
import { getFinalAbilities } from "./race";
import type { Character } from "../types/character";

function getAverageHitDieValue(hitDie: number): number {
  return Math.floor(hitDie / 2) + 1;
}

export function calculateMaxHitPoints(character: Character): number {
  const selectedClass = getCharacterClass(character.class);

  if (!selectedClass) return 0;

  const finalAbilities =
    character.ruleset === "2014"
      ? getFinalAbilities(character.abilities, character.race, character.subrace)
      : character.abilities;

  const constitutionModifier = calculateModifier(finalAbilities.constitution);

  const levelOneHp = selectedClass.hitDie + constitutionModifier;

  if (character.level <= 1) {
    return Math.max(1, levelOneHp);
  }

  const hpPerLevel =
    getAverageHitDieValue(selectedClass.hitDie) + constitutionModifier;

  const totalHp = levelOneHp + hpPerLevel * (character.level - 1);

  return Math.max(character.level, totalHp);
}