export function getCantripLimit(className: string, level: number): number {
    if (className === "Wizard") return level >= 4 ? 4 : 3;
    if (className === "Sorcerer") return level >= 4 ? 5 : 4;
    if (className === "Cleric") return 3;
    if (className === "Druid") return 2;
    if (className === "Warlock") return level >= 4 ? 3 : 2;
    if (className === "Bard") return level >= 4 ? 3 : 2;

    return 0;
}

export function getKnownSpellLimit(className: string, level: number): number {
    if (className === "Wizard") return 6;
    if (className === "Sorcerer") return level >= 2 ? 2 : 2;
    if (className === "Warlock") return level >= 2 ? 3 : 2;
    if (className === "Bard") return level >= 2 ? 5 : 4;

    if (className === "Cleric") return 4;
    if (className === "Druid") return 4;

    return 0;
}