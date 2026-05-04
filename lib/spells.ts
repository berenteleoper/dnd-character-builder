import { spells } from "@/data/spells";

export function getAvailableSpellsForClass(className: string) {
    return spells.filter((spell) => spell.classes.includes(className));
}

export function getSpellByName(spellName: string) {
    return spells.find((spell) => spell.name === spellName);
}