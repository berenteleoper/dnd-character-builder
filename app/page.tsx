"use client";

import { useState } from "react";
import AbilityCard from "../components/AbilityCard";
import CharacterForm from "../components/CharacterForm";
import { abilityList } from "../data/abilities";
import { calculateModifier } from "../lib/ability";
import type { AbilityName, Character } from "../types/character";

const initialCharacter: Character = {
  name: "",
  race: "Human",
  class: "Fighter",
  level: 1,
  abilities: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
};

export default function Home() {
  const [character, setCharacter] = useState<Character>(initialCharacter);

  function handleNameChange(nextName: string) {
    setCharacter({
      ...character,
      name: nextName,
    });
  }

  function handleRaceChange(nextRace: string) {
    setCharacter({
      ...character,
      race: nextRace,
    });
  }

  function handleClassChange(nextClass: string) {
    setCharacter({
      ...character,
      class: nextClass,
    });
  }

  function handleLevelChange(nextLevel: number) {
    setCharacter({
      ...character,
      level: nextLevel,
    });
  }

  function handleAbilityChange(abilityKey: AbilityName, nextValue: number) {
    setCharacter({
      ...character,
      abilities: {
        ...character.abilities,
        [abilityKey]: nextValue,
      },
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">DnD Character Builder</h1>
        <p className="mb-8 text-slate-300">
          DnD Character Sheet
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <CharacterForm
            character={character}
            onNameChange={handleNameChange}
            onRaceChange={handleRaceChange}
            onClassChange={handleClassChange}
            onLevelChange={handleLevelChange}
            onAbilityChange={handleAbilityChange}
          />

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              {character.name || "Unnamed Character"}
            </h2>

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

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {abilityList.map((ability) => {
                const value = character.abilities[ability.key];

                return (
                  <AbilityCard
                    key={ability.key}
                    name={ability.label}
                    value={value}
                    modifier={calculateModifier(value)}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}