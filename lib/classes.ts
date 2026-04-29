import { characterClasses } from "@/data/clases";

export function getCharacterClass(className: string) {
    return characterClasses.find((characterClass) => characterClass.name === className);
}