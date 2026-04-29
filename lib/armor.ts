import { armors } from "../data/armor";
import { getCharacterClass } from "./classes";

export function getArmorByName(armorName: string) {
  return armors.find((armor) => armor.name === armorName) ?? armors[0];
}

export function isCharacterProficientWithArmor(
  className: string,
  armorName: string,
  hasShield: boolean
): boolean {
  const selectedClass = getCharacterClass(className);
  const armor = getArmorByName(armorName);

  if (!selectedClass) return false;
  if (armor.category === "none") return true;

  const armorLabel =
    armor.category === "light"
      ? "Light Armor"
      : armor.category === "medium"
        ? "Medium Armor"
        : "Heavy Armor";

  const hasArmorProficiency =
    selectedClass.armorProficiencies.includes(armorLabel);

  const hasShieldProficiency =
    !hasShield || selectedClass.armorProficiencies.includes("Shields");

  return hasArmorProficiency && hasShieldProficiency;
}