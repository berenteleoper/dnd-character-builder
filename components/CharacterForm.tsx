import { abilityList } from "@/data/abilities";
import type { AbilityName, Character } from "@/types/character";
import AbilityInputRow from "./AbilityInputRow";

type CharacterFormProps = {
    character: Character;
    onNameChange: (nextName: string) => void;
    onRaceChange: (nextRace: string) => void;
    onClassChange: (nextClass: string) => void;
    onLevelChange: (nextLevel: number) => void;
    onAbilityChange: (abilityKey: AbilityName, nextValue: number) => void;
    onReset: () => void;
    onSave: () => void;
    onUpdate: () => void;
    saveMessage: string;
};

export default function CharacterForm({
    character,
    onNameChange,
    onRaceChange,
    onClassChange,
    onLevelChange,
    onAbilityChange,
    onReset,
    onSave,
    onUpdate,
    saveMessage,
}: CharacterFormProps) {
    return (
        <section className="rounded-2xl border-2 border-[#8f2f2f] bg-[#f7efe4] p-6 text-[#2f241c] shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Character Form</h2>

            <div className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={character.name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Enter character name"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Race</label>
                    <select
                        value={character.race}
                        onChange={(e) => onRaceChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 outline-none"
                    >
                        <option value="Human">Human</option>
                        <option value="Elf">Elf</option>
                        <option value="Dwarf">Dwarf</option>
                        <option value="Halfling">Halfling</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Class</label>
                    <select
                        value={character.class}
                        onChange={(e) => onClassChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 outline-none"
                    >
                        <option value="Fighter">Fighter</option>
                        <option value="Wizard">Wizard</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Cleric">Cleric</option>
                        <option value="Druid">Druid</option>
                        <option value="Warlock">Warlock</option>
                        <option value="Barbarian">Barbarian</option>
                        <option value="Paladin">Paladin</option>
                        <option value="Ranger">Ranger</option>
                        <option value="Bard">Bard</option>
                        <option value="Monk">Monk</option>
                        <option value="Sorcerer">Sorcerer</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Level</label>
                    <input
                        type="number"
                        min={1}
                        max={20}
                        value={character.level}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                            const nextLevel = e.target.valueAsNumber;
                            onLevelChange(Number.isNaN(nextLevel) ? 1 : nextLevel);
                        }}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 outline-none"
                    />
                </div>

                <div>
                    <h3 className="mb-3 text-lg font-semibold">Ability Scores</h3>

                    <div className="space-y-3">
                        {abilityList.map((ability) => (
                            <AbilityInputRow
                                key={ability.key}
                                abilityKey={ability.key}
                                label={ability.label}
                                value={character.abilities[ability.key]}
                                onChange={onAbilityChange}
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={character.id ? onUpdate : onSave}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                    {character.id ? "Update Character" : "Save Character"}
                </button>

                <div className="pt-2">
                    <button
                        type="button"
                        onClick={onReset}
                        className="w-full rounded-xl border border-red-500 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                        Reset Character
                    </button>
                </div>
            </div>
        </section>
    );
}