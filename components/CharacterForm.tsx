import { abilityList } from "@/data/abilities";
import { races } from "@/data/races";
import { characterClasses } from "@/data/clases";
import { armors } from "@/data/armor";
import { weapons } from "@/data/weapons";
import { isWeaponProficient } from "@/lib/weapon";
import { isCharacterProficientWithArmor } from "@/lib/armor";
import { getAvailableSpellsForClass } from "@/lib/spells";
import { getCantripLimit, getKnownSpellLimit } from "@/lib/spell-limits";
import { isSpellcaster } from "@/lib/spellcasting";
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
  Ruleset,
  StandardArrayValue,
} from "../types/character";
import AbilityInputRow from "./AbilityInputRow";
import { spells } from "@/data/spells";

type CharacterFormProps = {
  character: Character;
  onNameChange: (nextName: string) => void;
  onRaceChange: (nextRace: string) => void;
  onSubraceChange: (nextSubrace: string) => void;
  onClassChange: (nextClass: string) => void;
  onLevelChange: (nextLevel: number) => void;
  onRulesetChange: (nextRuleset: Ruleset) => void;
  onAvatarUrlChange: (nextAvatarUrl: string) => void;
  onArmorChange: (nextArmor: string) => void;
  onShieldChange: (nextHasShield: boolean) => void;
  onToggleSpell: (spellName: string) => void;
  onWeaponChange: (nextWeapon: string) => void;
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
  onSubraceChange,
  onClassChange,
  onLevelChange,
  onRulesetChange,
  onAvatarUrlChange,
  onArmorChange,
  onShieldChange,
  onToggleSpell,
  onWeaponChange,
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
  const selectedRace = races.find((race) => race.name === character.race);
  const availableSubraces = selectedRace?.subraces ?? [];
  const pointBuyUsedPoints = calculatePointBuyCost(character.abilities);
  const pointBuyRemainingPoints = getPointBuyRemainingPoints(character.abilities);
  const characterIsSpellcaster = isSpellcaster(character);
  const availableSpells = getAvailableSpellsForClass(character.class);
  const isArmorProficient = isCharacterProficientWithArmor(
    character.class,
    character.armor ?? "None",
    character.hasShield ?? false
  );
  const isWeaponOk = isWeaponProficient(
    character.class,
    character.weapon ?? "None"
  );

  const selectedSpells = character.spells ?? [];

  const selectedCantripCount = selectedSpells.filter((spellName) => {
    const spell = availableSpells.find((s) => s.name === spellName);
    return spell?.level === 0;
  }).length;

  const selectedLeveledSpellCount = selectedSpells.filter((spellName) => {
    const spell = availableSpells.find((s) => s.name === spellName);
    return spell && spell.level > 0;
  }).length;

  const cantripLimit = getCantripLimit(character.class, character.level);
  const knownSpellLimit = getKnownSpellLimit(character.class, character.level);

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
          <label className="mb-1 block text-sm font-medium">Avatar Image URL</label>
          <input
            type="text"
            value={character.avatarUrl}
            onChange={(e) => onAvatarUrlChange(e.target.value)}
            placeholder="Paste an image URL"
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          />
          <p className="mt-2 text-sm text-[#6a5848]">
            For now, use a direct image URL. File upload will come later.
          </p>
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

        {availableSubraces.length > 0 && (
          <div>
            <label className="mb-1 block text-sm font-medium">Subrace</label>
            <select
              value={character.subrace}
              onChange={(e) => onSubraceChange(e.target.value)}
              className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
            >
              <option value="">Select subrace</option>

              {availableSubraces.map((subrace) => (
                <option key={subrace.name} value={subrace.name}>
                  {subrace.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Class</label>
          <select
            value={character.class}
            onChange={(e) => onClassChange(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          >
            {characterClasses.map((characterClass) => (
              <option key={characterClass.name} value={characterClass.name}>
                {characterClass.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Ruleset</label>
          <select
            value={character.ruleset}
            onChange={(e) => onRulesetChange(e.target.value as Ruleset)}
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          >
            <option value="2014">D&D 5e 2014</option>
            <option value="2024">D&D 2024</option>
          </select>

          <p className="mt-2 text-sm text-[#6a5848]">
            2014 uses race ability bonuses. 2024 will use background-based bonuses later.
          </p>
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
          <label className="mb-1 block text-sm font-medium">Weapon</label>
          <select
            value={character.weapon ?? "None"}
            onChange={(e) => onWeaponChange(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c]"
          >
            {weapons.map((weapon) => (
              <option key={weapon.name} value={weapon.name}>
                {weapon.name}
              </option>
            ))}
          </select>
        </div>

        {!isWeaponOk && (
          <p className="rounded-2xl border border-amber-400 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            Your class is not proficient with this weapon.
          </p>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Armor</label>
          <select
            value={character.armor ?? "None"}
            onChange={(e) => onArmorChange(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3 text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          >
            {armors.map((armor) => (
              <option key={armor.name} value={armor.name}>
                {armor.name}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-[#d6c7b2] bg-[#fffaf3] px-4 py-3">
          <input
            type="checkbox"
            checked={character.hasShield ?? false}
            onChange={(e) => onShieldChange(e.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-sm font-medium text-[#2f241c]">Use Shield (+2 AC)</span>
        </label>

        {!isArmorProficient && (
          <p className="rounded-2x1 border border-amber-400 bg-amber-50 px-4 py-3 text-sm font medium text-amber-800">
            Your class is not proficient with this armor or shield. You can still select it,
            but it may cause penalties depending on the rules you use.
          </p>
        )}

        {characterIsSpellcaster && (
          <div className="rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-4">
            <h3 className="mb-3 text-lg font-bold text-[#2f241c]">Spells</h3>

            <p className="mb-3 text-sm text-[#6a5848]">
              Cantrips: {selectedCantripCount}/{cantripLimit} • Spells:{" "}
              {selectedLeveledSpellCount}/{knownSpellLimit}
            </p>

            <div className="space-y-2">
              {availableSpells.map((spell) => {
                const isSelected = selectedSpells.includes(spell.name);
                const isCantrip = spell.level === 0;

                const reachedLimit = isCantrip
                  ? selectedCantripCount >= cantripLimit
                  : selectedLeveledSpellCount >= knownSpellLimit;

                const isDisabled = !isSelected && reachedLimit;

                return (
                  <label
                    key={spell.name}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] px-4 py-3 ${isDisabled ? "opacity-50" : ""
                      }`}
                  >
                    <div>
                      <p className="font-semibold text-[#2f241c]">{spell.name}</p>
                      <p className="text-sm text-[#6a5848]">
                        Level {spell.level === 0 ? "Cantrip" : spell.level} •{" "}
                        {spell.school}
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => onToggleSpell(spell.name)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        )}

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