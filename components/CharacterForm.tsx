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
};

export default function CharacterForm({
    character,
    onNameChange,
    onRaceChange,
    onClassChange,
    onLevelChange,
    onAbilityChange,
}: CharacterFormProps) {
    return(
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
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
      </div>
    </section>
  );
}