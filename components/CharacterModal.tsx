"use client";

import { abilityList } from "../data/abilities";
import { calculateModifier } from "../lib/ability";
import type { Character } from "../types/character";

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
                className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {character.name || "Unnamed Character"}
                        </h2>
                        <p className="mt-1 text-slate-400">Character Details</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                    >
                        Close
                    </button>
                </div>

                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                    <p>
                        <span className="font-semibold">Race:</span> {character.race}
                    </p>
                    <p>
                        <span className="font-semibold">Class:</span> {character.class}
                    </p>
                    <p>
                        <span className="font-semibold">Level:</span> {character.level}
                    </p>
                </div>

                <div>
                    <h3 className="mb-3 text-lg font-semibold">Ability Scores</h3>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {abilityList.map((ability) => {
                            const value = character.abilities[ability.key];
                            const modifier = calculateModifier(value);

                            return (
                                <div
                                    key={ability.key}
                                    className="rounded-xl border border-slate-700 bg-slate-800 p-4"
                                >
                                    <p className="text-sm text-slate-400">{ability.label}</p>
                                    <p className="text-xl font-bold">
                                        {value} ({modifier >= 0 ? "+" : ""}
                                        {modifier})
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => onLoadIntoForm(character)}
                        className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500"
                    >
                        Edit in Form
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-lg border border-red-500 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                        Delete Character
                    </button>
                </div>
            </div>
        </div>
    );
}