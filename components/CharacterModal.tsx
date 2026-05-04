"use client";

import { abilityList } from "@/data/abilities";
import { calculateModifier } from "@/lib/ability";
import { getClassTheme } from "@/lib/theme";
import { Character } from "@/types/character";

import {
    getCombinedRaceBonuses,
    getCombinedRaceTraits,
    getFinalAbilityScore,
    getRaceSpeed,
} from "@/lib/race";

import { getCharacterClass } from "@/lib/classes";
import { calculateProficiencyBonus } from "@/lib/level";
import { calculateSavingThrow } from "@/lib/saving-throws";
import { calculateMaxHitPoints } from "@/lib/hit-points";
import { calculateArmorClass, calculateInitiative } from "@/lib/combat";
import { getWeaponByName } from "@/lib/weapon";

type CharacterModalProps = {
    character: Character | null;
    onClose: () => void;
    onLoadIntoForm: (character: Character) => void;
    onDelete: () => void;
};

export default function CharacterModal({
    character,
    onClose,
    onLoadIntoForm,
    onDelete,
}: CharacterModalProps) {
    if (!character) return null;
    const theme = getClassTheme(character.class);
    const selectedClass = getCharacterClass(character.class);

    const proficiencyBonus = calculateProficiencyBonus(character.level);
    const maxHitPoints = calculateMaxHitPoints(character);
    const armorClass = calculateArmorClass(character);
    const initiative = calculateInitiative(character);
    const speed = getRaceSpeed(character.race);

    const weapon = getWeaponByName(character.weapon);

    const raceBonuses =
        character.ruleset === "2014"
            ? getCombinedRaceBonuses(character.race, character.subrace)
            : {};

    const raceTraits =
        character.ruleset === "2014"
            ? getCombinedRaceTraits(character.race, character.subrace)
            : [];

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "rgba(0, 0, 0, 0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border bg-[#f8f1e7] p-6 text-[#2f241c] shadow-2xl"
                style={{ borderColor: theme.border }}
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 text-2xl font-bold"
                            style={{
                                borderColor: theme.primary,
                                backgroundColor: theme.soft,
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
                            <h2 className="text-3xl font-bold text-[#2f241c]">
                                {character.name || "Unnamed Character"}
                            </h2>

                            <p className="mt-1 text-sm text-[#6a5848]">
                                {character.class} • {character.race}
                                {character.subrace ? ` • ${character.subrace}` : ""} • Level{" "}
                                {character.level}
                            </p>

                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6f58]">
                                Ruleset: {character.ruleset}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-[#d8cab5] bg-[#fffaf3] px-4 py-2 text-sm font-semibold text-[#2f241c] transition hover:bg-[#f4ecdf]"
                    >
                        Close
                    </button>
                </div>

                <div className="mb-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    <div className="rounded-2xl border border-[#eadcc8] bg-[#fffaf3] p-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#6a5848]">
                            HP
                        </p>
                        <p className="text-2xl font-bold text-[#2f241c]">{maxHitPoints}</p>
                    </div>

                    <div className="rounded-2xl border border-[#eadcc8] bg-[#fffaf3] p-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#6a5848]">
                            AC
                        </p>
                        <p className="text-2xl font-bold text-[#2f241c]">{armorClass}</p>
                    </div>

                    <div className="rounded-2xl border border-[#eadcc8] bg-[#fffaf3] p-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#6a5848]">
                            Init
                        </p>
                        <p className="text-2xl font-bold text-[#2f241c]">
                            {initiative >= 0 ? "+" : ""}
                            {initiative}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#eadcc8] bg-[#fffaf3] p-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#6a5848]">
                            Speed
                        </p>
                        <p className="text-2xl font-bold text-[#2f241c]">{speed} ft</p>
                    </div>

                    <div className="rounded-2xl border border-[#eadcc8] bg-[#fffaf3] p-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#6a5848]">
                            Prof
                        </p>
                        <p className="text-2xl font-bold text-[#2f241c]">
                            +{proficiencyBonus}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#eadcc8] bg-[#fffaf3] p-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#6a5848]">
                            Hit Die
                        </p>
                        <p className="text-2xl font-bold text-[#2f241c]">
                            d{selectedClass?.hitDie ?? "-"}
                        </p>
                    </div>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
                        <h3 className="mb-3 text-lg font-bold text-[#2f241c]">Equipment</h3>

                        <div className="space-y-2 text-sm text-[#5f4d3d]">
                            <p>
                                <span className="font-semibold text-[#2f241c]">Armor:</span>{" "}
                                {character.armor ?? "None"}
                                {character.hasShield ? " + Shield" : ""}
                            </p>

                            <p>
                                <span className="font-semibold text-[#2f241c]">Weapon:</span>{" "}
                                {weapon.name} {weapon.damage !== "-" ? `(${weapon.damage})` : ""}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[#d8cab5] bg-[#fffaf3] p-5">
                        <h3 className="mb-3 text-lg font-bold text-[#2f241c]">
                            Class Summary
                        </h3>

                        {!selectedClass ? (
                            <p className="text-sm text-[#6a5848]">No class data available.</p>
                        ) : (
                            <div className="space-y-2 text-sm text-[#5f4d3d]">
                                <p>
                                    <span className="font-semibold text-[#2f241c]">
                                        Primary:
                                    </span>{" "}
                                    {selectedClass.primaryAbilities.join(", ")}
                                </p>

                                <p>
                                    <span className="font-semibold text-[#2f241c]">
                                        Saving Throws:
                                    </span>{" "}
                                    {selectedClass.savingThrows.join(", ")}
                                </p>

                                <p>
                                    <span className="font-semibold text-[#2f241c]">
                                        Spellcasting:
                                    </span>{" "}
                                    {selectedClass.isSpellcaster
                                        ? selectedClass.spellcastingAbility
                                        : "None"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="mb-3 text-lg font-bold text-[#2f241c]">
                        Ability Scores
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                                    : baseValue;

                            const modifier = calculateModifier(finalValue);
                            const bonus = raceBonuses[ability.key] ?? 0;

                            return (
                                <div
                                    key={ability.key}
                                    className="rounded-2xl border border-[#eadcc8] bg-[#fffaf3] p-4"
                                >
                                    <p
                                        className="text-xs font-bold uppercase tracking-[0.14em]"
                                        style={{ color: theme.primary }}
                                    >
                                        {ability.label}
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-[#2f241c]">
                                        {finalValue}{" "}
                                        <span className="text-lg">
                                            ({modifier >= 0 ? "+" : ""}
                                            {modifier})
                                        </span>
                                    </p>

                                    {bonus > 0 && (
                                        <p className="mt-1 text-xs font-semibold text-[#6a5848]">
                                            Base {baseValue} + Race {bonus}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="mb-3 text-lg font-bold text-[#2f241c]">
                        Saving Throws
                    </h3>

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {abilityList.map((ability) => {
                            const value = calculateSavingThrow(character, ability.key);
                            const isProf =
                                selectedClass?.savingThrows.includes(ability.key) ?? false;

                            return (
                                <div
                                    key={ability.key}
                                    className="flex items-center justify-between rounded-2xl border border-[#eadcc8] bg-[#fffaf3] px-4 py-3"
                                >
                                    <div>
                                        <p className="font-semibold text-[#2f241c]">
                                            {ability.label}
                                        </p>

                                        {isProf && (
                                            <p
                                                className="text-xs font-semibold"
                                                style={{ color: theme.primary }}
                                            >
                                                Proficient
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-lg font-bold text-[#2f241c]">
                                        {value >= 0 ? "+" : ""}
                                        {value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-[#d8cab5] pt-5">
                    <button
                        type="button"
                        onClick={() => onLoadIntoForm(character)}
                        className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500"
                    >
                        Edit in Form
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-xl border border-red-500 px-4 py-2 font-semibold text-red-500 transition hover:bg-red-500/10"
                    >
                        Delete Character
                    </button>
                </div>
            </div>
        </div>
    );
}