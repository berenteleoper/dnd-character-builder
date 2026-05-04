import AbilityCard from "./AbilityCard";
import { abilityList } from "../data/abilities";
import { calculateModifier } from "../lib/ability";
import { getClassTheme } from "../lib/theme";
import { getCharacterClass } from "@/lib/classes";
import { calculateProficiencyBonus } from "../lib/level";
import { calculateSavingThrow } from "../lib/saving-throws";
import { calculateMaxHitPoints } from "@/lib/hit-points";
import { calculateArmorClass, calculateInitiative } from "@/lib/combat";
import { getSpellByName } from "@/lib/spells";
import {
  calculateWeaponAttackBonus,
  calculateWeaponDamageBonus,
  getWeaponByName,
  isWeaponProficient,
} from "../lib/weapon";
import type { Character } from "../types/character";
import {
  getCombinedRaceBonuses,
  getCombinedRaceTraits,
  getFinalAbilityScore,
  getRaceSpeed,
} from "../lib/race";
import {
  calculateSpellAttackBonus,
  calculateSpellSaveDc,
  getSpellcastingAbility,
  isSpellcaster,
} from "../lib/spellcasting";

type CharacterPreviewProps = {
  character: Character;
};

export default function CharacterPreview({
  character,
}: CharacterPreviewProps) {
  const theme = getClassTheme(character.class);

  const selectedClass = getCharacterClass(character.class);

  const proficiencyBonus = calculateProficiencyBonus(character.level);

  const maxHitPoints = calculateMaxHitPoints(character);

  const armorClass = calculateArmorClass(character);

  const weapon = getWeaponByName(character.weapon ?? "None");
  const weaponAttackBonus = calculateWeaponAttackBonus(character);
  const weaponDamageBonus = calculateWeaponDamageBonus(character);
  const isCurrentWeaponProficient = isWeaponProficient(
    character.class,
    character.weapon ?? "None"
  );

  const initiative = calculateInitiative(character);

  const speed = getRaceSpeed(character.race);

  const raceBonuses =
    character.ruleset === "2014"
      ? getCombinedRaceBonuses(character.race, character.subrace)
      : {};

  const raceTraits =
    character.ruleset === "2014"
      ? getCombinedRaceTraits(character.race, character.subrace)
      : [];

  const raceBonusEntries = abilityList
    .map((ability) => ({
      label: ability.label,
      bonus: raceBonuses[ability.key] ?? 0,
    }))
    .filter((item) => item.bonus > 0);

  const characterIsSpellcaster = isSpellcaster(character);
  const spellcastingAbility = getSpellcastingAbility(character);
  const spellSaveDc = calculateSpellSaveDc(character);
  const spellAttackBonus = calculateSpellAttackBonus(character);

  return (
    <section
      className="rounded-3xl border p-6 shadow-[0_10px_30px_rgba(60,40,20,0.08)]"
      style={{
        backgroundColor: "#f8f1e7",
        borderColor: "#c8b79e",
        color: "#2f241c",
      }}
    >
      <div className="mb-6 overflow-hidden rounded-3xl border border-[#d8cab5] bg-[#fffaf3]">
        <div
          className="h-2 w-full"
          style={{ backgroundColor: theme.primary }}
        />

        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border bg-[#f4ecdf] text-3xl font-bold"
                style={{
                  borderColor: theme.border,
                  color: theme.primary,
                }}
              >
                {character.avatarUrl ? (
                  <img
                    src={character.avatarUrl}
                    alt={character.name || "Character avatar"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{(character.name || "?").charAt(0).toUpperCase()}</span>
                )}
              </div>

              <div>
                <p
                  className="mb-2 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: theme.primary }}
                >
                  Character Preview
                </p>

                <h2 className="text-4xl font-bold leading-tight text-[#2f241c]">
                  {character.name || "Unnamed Character"}
                </h2>
              </div>
            </div>

            <div
              className="rounded-2xl px-4 py-2 text-sm font-bold uppercase tracking-[0.16em]"
              style={{
                backgroundColor: theme.soft,
                color: theme.primary,
                border: `1px solid ${theme.border}`,
              }}
            >
              {character.class}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-[#d8cab5] bg-[#f4ecdf] px-4 py-2 text-sm font-medium text-[#4f4033]">
              Race: <span className="font-semibold text-[#2f241c]">{character.race}</span>
            </div>

            <div className="rounded-full border border-[#d8cab5] bg-[#f4ecdf] px-4 py-2 text-sm font-medium text-[#4f4033]">
              Class: <span className="font-semibold text-[#2f241c]">{character.class}</span>
            </div>

            <div className="rounded-full border border-[#d8cab5] bg-[#f4ecdf] px-4 py-2 text-sm font-medium text-[#4f4033]">
              Level: <span className="font-semibold text-[#2f241c]">{character.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {abilityList.map((ability) => {
          const baseValue = character.abilities[ability.key];

          const finalValue =
            character.ruleset === "2014"
              ? getFinalAbilityScore(
                ability.key,
                character.abilities,
                character.race,
                character.subrace
              )
              : character.abilities[ability.key];

          const raceBonus = raceBonuses[ability.key] ?? 0;

          return (
            <AbilityCard
              key={ability.key}
              name={ability.label}
              value={finalValue}
              modifier={calculateModifier(finalValue)}
              accentColor={theme.primary}
              borderColor={theme.border}
              backgroundColor="#fffaf3"
              textColor="#2f241c"
              baseValue={baseValue}
              bonusValue={raceBonus}
            />
          );
        })}
      </div>
      <div className="mt-6 rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-[#2f241c]">Race Bonuses</h3>

          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
            style={{
              backgroundColor: theme.soft,
              color: theme.primary,
              border: `1px solid ${theme.border}`,
            }}
          >
            {character.race}
          </span>
        </div>

        {raceBonusEntries.length === 0 ? (
          <p className="text-sm text-[#6a5848]">
            This race does not provide ability score bonuses.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {raceBonusEntries.map((item) => (
              <span
                key={item.label}
                className="rounded-full border border-[#d8cab5] bg-[#f4ecdf] px-3 py-2 text-sm font-semibold text-[#3f3025]"
              >
                +{item.bonus} {item.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
        <h3 className="mb-3 text-lg font-bold text-[#2f241c]">Race Traits</h3>

        {raceTraits.length === 0 ? (
          <p className="text-sm text-[#6a5848]">No race traits available.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {raceTraits.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-[#d8cab5] bg-[#f4ecdf] px-3 py-2 text-sm font-semibold text-[#3f3025]"
              >
                {trait}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-[#2f241c]">Class Summary</h3>

          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
            style={{
              backgroundColor: theme.soft,
              color: theme.primary,
              border: `1px solid ${theme.border}`,
            }}
          >
            {character.class}
          </span>
        </div>

        {!selectedClass ? (
          <p className="text-sm text-[#6a5848]">No class data available.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-[#6a5848]">Hit Die</p>
              <p className="text-lg font-bold text-[#2f241c]">d{selectedClass.hitDie}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#6a5848]">Spellcasting</p>
              <p className="text-lg font-bold text-[#2f241c]">
                {selectedClass.isSpellcaster
                  ? selectedClass.spellcastingAbility
                  : "None"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#6a5848]">Primary Ability</p>
              <p className="text-sm font-bold text-[#2f241c]">
                {selectedClass.primaryAbilities.join(", ")}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#6a5848]">Saving Throws</p>
              <p className="text-sm font-bold text-[#2f241c]">
                {selectedClass.savingThrows.join(", ")}
              </p>
            </div>
          </div>

        )}
      </div>
      <div className="mt-4 rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-[#2f241c]">Combat Stats</h3>

          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
            style={{
              backgroundColor: theme.soft,
              color: theme.primary,
              border: `1px solid ${theme.border}`,
            }}
          >
            Level {character.level}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Max HP</p>
            <p className="text-3xl font-bold text-[#2f241c]">{maxHitPoints}</p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Armor Class</p>
            <p className="text-3xl font-bold text-[#2f241c]">{armorClass}</p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Initiative</p>
            <p className="text-3xl font-bold text-[#2f241c]">
              {initiative >= 0 ? "+" : ""}
              {initiative}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Speed</p>
            <p className="text-3xl font-bold text-[#2f241c]">{speed} ft.</p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Hit Die</p>
            <p className="text-3xl font-bold text-[#2f241c]">
              d{selectedClass?.hitDie ?? "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Proficiency</p>
            <p className="text-3xl font-bold text-[#2f241c]">+{proficiencyBonus}</p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Weapon</p>
            <p className="text-lg font-bold text-[#2f241c]">
              {weapon.name === "None" ? "None" : `${weapon.name} (${weapon.damage})`}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Attack Bonus</p>
            <p className="text-3xl font-bold text-[#2f241c]">
              {weapon.name === "None" ? "-" : `${weaponAttackBonus >= 0 ? "+" : ""}${weaponAttackBonus}`}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
            <p className="text-sm font-semibold text-[#6a5848]">Damage</p>
            <p className="text-2xl font-bold text-[#2f241c]">
              {weapon.name === "None"
                ? "-"
                : `${weapon.damage} ${weaponDamageBonus >= 0 ? "+" : ""}${weaponDamageBonus}`}
            </p>
          </div>
        </div>

      </div>

      {characterIsSpellcaster && (
        <div className="mt-4 rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-[#2f241c]">Spellcasting</h3>

            <span
              className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
              style={{
                backgroundColor: theme.soft,
                color: theme.primary,
                border: `1px solid ${theme.border}`,
              }}
            >
              {spellcastingAbility ?? "None"}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
              <p className="text-sm font-semibold text-[#6a5848]">Spell Ability</p>
              <p className="text-xl font-bold capitalize text-[#2f241c]">
                {spellcastingAbility}
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
              <p className="text-sm font-semibold text-[#6a5848]">Spell Save DC</p>
              <p className="text-3xl font-bold text-[#2f241c]">
                {spellSaveDc ?? "-"}
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] p-4">
              <p className="text-sm font-semibold text-[#6a5848]">Spell Attack</p>
              <p className="text-3xl font-bold text-[#2f241c]">
                {spellAttackBonus === null
                  ? "-"
                  : `${spellAttackBonus >= 0 ? "+" : ""}${spellAttackBonus}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {characterIsSpellcaster && (
        <div className="mt-4 rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
          <h3 className="mb-3 text-lg font-bold text-[#2f241c]">Selected Spells</h3>

          {(character.spells ?? []).length === 0 ? (
            <p className="text-sm text-[#6a5848]">No spells selected yet.</p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {(character.spells ?? []).map((spellName) => {
                const spell = getSpellByName(spellName);

                return (
                  <div
                    key={spellName}
                    className="rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] px-4 py-3"
                  >
                    <p className="font-semibold text-[#2f241c]">{spellName}</p>
                    {spell && (
                      <p className="text-sm text-[#6a5848]">
                        Level {spell.level === 0 ? "Cantrip" : spell.level} • {spell.school}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-[#2f241c]">Proficiency & Saves</h3>

          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
            style={{
              backgroundColor: theme.soft,
              color: theme.primary,
              border: `1px solid ${theme.border}`,
            }}
          >
            Proficiency +{proficiencyBonus}
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {abilityList.map((ability) => {
            const saveValue = calculateSavingThrow(character, ability.key);
            const isProficient =
              selectedClass?.savingThrows.includes(ability.key) ?? false;

            return (
              <div
                key={ability.key}
                className="flex items-center justify-between rounded-2xl border border-[#eadcc8] bg-[#f8f1e7] px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-[#2f241c]">{ability.label}</p>
                  {isProficient && (
                    <p className="text-xs font-semibold" style={{ color: theme.primary }}>
                      Proficient
                    </p>
                  )}
                </div>

                <p className="text-lg font-bold text-[#2f241c]">
                  {saveValue >= 0 ? "+" : ""}
                  {saveValue}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}