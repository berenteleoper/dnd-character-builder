import { abilityList } from "@/data/abilities";
import { races } from "@/data/races";
import {
  calculatePointBuyCost,
  getPointBuyRemainingPoints,
  pointBuyValues,
  standardArrayValues,
} from "@/lib/ability-generation";
import type {
  AbilityGenerationMethod,
  AbilityName,
  Character,
  StandardArrayValue,
} from "../types/character";
import AbilityInputRow from "./AbilityInputRow";

type CharacterFormProps = {
  character: Character;
  onNameChange: (nextName: string) => void;
  onRaceChange: (nextRace: string) => void;
  onClassChange: (nextClass: string) => void;
  onLevelChange: (nextLevel: number) => void;
  onAbilityChange: (abilityKey: AbilityName, nextValue: number) => void;
  onGenerationMethodChange: (method: AbilityGenerationMethod) => void;
  onStandardArrayAssignmentChange: (
    abilityKey: AbilityName,
    value: StandardArrayValue
  ) => void;
  onRollAbilities: () => void;
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
  onGenerationMethodChange,
  onStandardArrayAssignmentChange,
  onRollAbilities,
  onReset,
  onSave,
  onUpdate,
  saveMessage,
}: CharacterFormProps) {
  const assignedValues = Object.values(character.standardArrayAssignments ?? {});
  const pointBuyUsedPoints = calculatePointBuyCost(character.abilities);
  const pointBuyRemainingPoints = getPointBuyRemainingPoints(character.abilities);

  return (
    <section className="rounded-3xl border border-[#c8b79e] bg-[#f8f1e7] p-6 text-[#2f241c] shadow-[0_10px_30px_rgba(60,40,20,0.08)]">
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-[#2f241c]">
        Character Form
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter character name"
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Race</label>
          <select
            value={character.race}
            onChange={(e) => onRaceChange(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          >
            {races.map((race) => (
              <option key={race.name} value={race.name}>
                {race.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-[#6a5848]">
            Race bonuses are applied automatically in the preview.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Class</label>
          <select
            value={character.class}
            onChange={(e) => onClassChange(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
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
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Ability Generation Method
          </label>

          <select
            value={character.generationMethod}
            onChange={(e) =>
              onGenerationMethodChange(e.target.value as AbilityGenerationMethod)
            }
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          >
            <option value="manual">Manual</option>
            <option value="standardArray">Standard Array</option>
            <option value="diceRoll">Dice Roll</option>
            <option value="pointBuy">Point Buy</option>
          </select>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          {character.generationMethod === "diceRoll" && (
            <button
              type="button"
              onClick={onRollAbilities}
              className="rounded-xl border border-[#b14545] bg-[#fffaf3] px-4 py-2 font-semibold text-[#7a2f2f] transition hover:bg-[#f8ede8]"
            >
              Roll Abilities
            </button>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Ability Scores</h3>

          {character.generationMethod === "pointBuy" && (
            <div className="mb-4 rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-[#2f241c]">Point Buy</p>

                <div className="flex gap-3 text-sm">
                  <span className="rounded-full bg-[#efe3d3] px-3 py-1 font-semibold text-[#7a2f2f]">
                    Used: {pointBuyUsedPoints}
                  </span>
                  <span className="rounded-full bg-[#efe3d3] px-3 py-1 font-semibold text-[#7a2f2f]">
                    Remaining: {pointBuyRemainingPoints}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-sm text-[#6a5848]">
                Point Buy allows scores from 8 to 15 before racial bonuses. Total budget is 27 points.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {abilityList.map((ability) => {
              const selectedValue =
                character.standardArrayAssignments?.[ability.key];

              const availableValues = standardArrayValues.filter(
                (value) =>
                  !assignedValues.includes(value) || value === selectedValue
              );

              return (
                <AbilityInputRow
                  key={ability.key}
                  abilityKey={ability.key}
                  label={ability.label}
                  value={character.abilities[ability.key]}
                  generationMethod={character.generationMethod}
                  selectedStandardArrayValue={selectedValue}
                  availableStandardArrayValues={availableValues}
                  pointBuyValues={pointBuyValues}
                  pointBuyUsedPoints={pointBuyUsedPoints}
                  onChange={onAbilityChange}
                  onStandardArrayChange={onStandardArrayAssignmentChange}
                />
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={character.id ? onUpdate : onSave}
          className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500"
        >
          {character.id ? "Update Character" : "Save Character"}
        </button>

        {saveMessage && (
          <p className="text-sm font-medium text-emerald-700">{saveMessage}</p>
        )}

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