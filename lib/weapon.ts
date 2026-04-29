import { weapons } from "@/data/weapons";
import { getCharacterClass } from "./classes";

export function getWeaponByName(name: string) {
    return weapons.find((w) => w.name === name) ?? weapons[0];
}

export function isWeaponProficient(className: string, weaponName: string) {
    const selectedClass = getCharacterClass(className);
    const weapon = getWeaponByName(weaponName);

    if (!selectedClass) return false;
    if (weapon.name === "None") return true;

    if(weapon.category === "simple") {
        return selectedClass.weaponProficiencies.includes("Simple Weapons");
    }

    if(weapon.category === "martial") {
        return selectedClass.weaponProficiencies.includes("Martial Weapons")
    }

    return false;
}