"use client";

import { useEffect, useState } from "react";
import AbilityCard from "../components/AbilityCard";
import CharacterForm from "../components/CharacterForm";
import CharacterModal from "@/components/CharacterModal";
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
  const [saveMessage, setSaveMessage] = useState("");
  const [savedCharacters, setSavedCharacters] = useState<Character[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    try {
      const storedCharacter = localStorage.getItem("character");
      const storedCharacters = localStorage.getItem("characters");

      if (storedCharacter) {
        const parsedCharacter: Character = JSON.parse(storedCharacter);
        setCharacter(parsedCharacter);
      }

      if (storedCharacters) {
        const parsedCharacters: Character[] = JSON.parse(storedCharacters);
        setSavedCharacters(parsedCharacters);
      }
    } catch {
      console.error("Failed to load character data from localStorage.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("character", JSON.stringify(character));
  }, [character, isLoaded]);

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

  function handleSaveCharacter() {
    const storedCharacters = localStorage.getItem("characters");

    let characters: Character[] = [];

    if (storedCharacters) {
      try {
        characters = JSON.parse(storedCharacters);
      } catch {
        characters = [];
      }
    }

    characters.push(character);

    localStorage.setItem("characters", JSON.stringify(characters));
    setSavedCharacters(characters);

    setSaveMessage("Character saved!");

    setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  }

  function handleOpenCharacterModal(selected: Character) {
    console.log("clicked character:", selected.name);
    setSelectedCharacter(selected);
  }

  function handleCloseCharacterModal() {
    setSelectedCharacter(null);
  }

  function handleResetCharacter() {
    setCharacter(initialCharacter);
    setSaveMessage("");
  }

  function handleLoadCharacterIntoForm(selected: Character) {
  setCharacter({
    ...selected,
    abilities: {
      ...selected.abilities,
    },
  });
  setSelectedCharacter(null);
  setSaveMessage("");
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
            onReset={handleResetCharacter}
            onSave={handleSaveCharacter}
            saveMessage={saveMessage}
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
          <p className="mb-4 text-sm text-yellow-400">
            Selected: {selectedCharacter ? selectedCharacter.name : "none"}
          </p>
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Saved Characters</h2>

            {savedCharacters.length === 0 ? (
              <p className="text-slate-400">No saved characters yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {savedCharacters.map((savedCharacter, index) => (
                  <div
                    key={`${savedCharacter.name}-${index}`}
                    onClick={() => handleOpenCharacterModal(savedCharacter)}
                    className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:border-slate-500 hover:bg-slate-700"
                  >
                    <h3 className="mb-2 text-xl font-semibold">
                      {savedCharacter.name || "Unnamed Character"}
                    </h3>

                    <div className="space-y-1 text-sm text-slate-300">
                      <p>
                        <span className="font-semibold">Race:</span> {savedCharacter.race}
                      </p>
                      <p>
                        <span className="font-semibold">Class:</span> {savedCharacter.class}
                      </p>
                      <p>
                        <span className="font-semibold">Level:</span> {savedCharacter.level}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      {selectedCharacter && (
  <p className="text-red-400">MODAL STATE ACTIVE: {selectedCharacter.name}</p>
)}

      <CharacterModal
        character={selectedCharacter}
        onClose={handleCloseCharacterModal}
        onLoadIntoForm={handleLoadCharacterIntoForm}
      />
    </main>
  );
}