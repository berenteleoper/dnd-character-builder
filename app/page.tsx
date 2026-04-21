"use client";

import { useEffect, useState } from "react";
import AbilityCard from "../components/AbilityCard";
import CharacterForm from "../components/CharacterForm";
import CharacterModal from "@/components/CharacterModal";
import { abilityList } from "../data/abilities";
import { calculateModifier } from "../lib/ability";
import {
  buildAbilitiesFromStandardArray,
  generateRolledAbilities,
  standardArrayValues,
} from "../lib/ability-generation";
import type {
  AbilityGenerationMethod,
  AbilityName,
  Character,
  StandardArrayValue,
} from "../types/character";
import CharacterPreview from "../components/CharacterPreview";

const initialCharacter: Character = {
  id: "",
  name: "",
  race: "Human",
  class: "Fighter",
  level: 1,
  generationMethod: "manual",
  standardArrayAssignments: {},
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
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);


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

  function createCharacterId() {
    return crypto.randomUUID();
  }

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

  function handleGenerationMethodChange(method: AbilityGenerationMethod) {
    setCharacter({
      ...character,
      generationMethod: method,
      standardArrayAssignments: method === "standardArray" ? {} : {},
    });
  }

  function handleRollAbilities() {
    setCharacter({
      ...character,
      abilities: generateRolledAbilities(),
    });
  }

  function handleStandardArrayAssignment(
    abilityKey: AbilityName,
    value: StandardArrayValue
  ) {
    const nextAssignments = {
      ...(character.standardArrayAssignments ?? {}),
      [abilityKey]: value,
    };

    setCharacter({
      ...character,
      standardArrayAssignments: nextAssignments,
      abilities: buildAbilitiesFromStandardArray(nextAssignments),
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

    const characterToSave: Character = {
      ...character,
      id: createCharacterId(),
      abilities: {
        ...character.abilities,
      },
    };

    characters.push(characterToSave);

    localStorage.setItem("characters", JSON.stringify(characters));
    setSavedCharacters(characters);
    setCharacter(characterToSave);

    setSaveMessage("Character saved!");

    setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  }

  function handleOpenCharacterModal(selected: Character) {
    setSelectedCharacter(selected);
    setSelectedCharacterId(selected.id);
  }

  function handleCloseCharacterModal() {
    setSelectedCharacter(null);
    setSelectedCharacterId(null);
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
    setSelectedCharacterId(null);
    setSaveMessage("");
  }

  function handleDeleteCharacter() {
    if (!selectedCharacterId) return;

    const updatedCharacters = savedCharacters.filter(
      (savedCharacter) => savedCharacter.id !== selectedCharacterId
    );

    setSavedCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));

    setSelectedCharacter(null);
    setSelectedCharacterId(null);
    setSaveMessage("");
  }

  function handleUpdateCharacter() {
    if (!character.id) return;

    const updatedCharacters = savedCharacters.map((savedCharacters) =>
      savedCharacters.id === character.id
        ? {
          ...character,
          abilities: {
            ...character.abilities,
          },
        }
        : savedCharacters
    );

    setSavedCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    localStorage.setItem("character", JSON.stringify(character));

    setSaveMessage("Character updated!");

    setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  }

  return (
    <main className="min-h-screen px-6 py-10 text-[#2f241c]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-[#2f241c]">
            DnD Character Builder
          </h1>
          <p className="mt-2 text-base text-[#6a5848]">
            Create, save, edit, and manage your character sheet.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <CharacterForm
            character={character}
            onNameChange={handleNameChange}
            onRaceChange={handleRaceChange}
            onClassChange={handleClassChange}
            onLevelChange={handleLevelChange}
            onAbilityChange={handleAbilityChange}
            onGenerationMethodChange={handleGenerationMethodChange}
            onRollAbilities={handleRollAbilities}
            onStandardArrayAssignmentChange={handleStandardArrayAssignment}
            onReset={handleResetCharacter}
            onSave={handleSaveCharacter}
            onUpdate={handleUpdateCharacter}
            saveMessage={saveMessage}
          />

          <section className="rounded-3xl border border-[#c8b79e] bg-[#f8f1e7] p-6 shadow-[0_10px_30px_rgba(60,40,20,0.08)]">
            <h2 className="mb-4 text-2xl font-semibold text-[#2f241c]">
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

        <section className="mt-8 rounded-3xl border border-[#c8b79e] bg-[#f8f1e7] p-6 shadow-[0_10px_30px_rgba(60,40,20,0.08)]">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#2f241c]">
            Saved Characters
          </h2>

          {savedCharacters.length === 0 ? (
            <p className="text-[#6a5848]">No saved characters yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {savedCharacters.map((savedCharacter, index) => (
                <div
                  key={savedCharacter.id || index}
                  onClick={() => handleOpenCharacterModal(savedCharacter)}
                  className="cursor-pointer rounded-2xl border border-[#ddd0bc] bg-[#fffaf3] p-4 transition hover:-translate-y-0.5 hover:border-[#b14545] hover:shadow-md"
                >
                  <h3 className="mb-2 text-xl font-semibold text-[#2f241c]">
                    {savedCharacter.name || "Unnamed Character"}
                  </h3>

                  <div className="space-y-1 text-sm text-[#5f4d3d]">
                    <p>
                      <span className="font-semibold text-[#2f241c]">Race:</span>{" "}
                      {savedCharacter.race}
                    </p>
                    <p>
                      <span className="font-semibold text-[#2f241c]">Class:</span>{" "}
                      {savedCharacter.class}
                    </p>
                    <p>
                      <span className="font-semibold text-[#2f241c]">Level:</span>{" "}
                      {savedCharacter.level}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedCharacter && (
        <p className="text-red-400">MODAL STATE ACTIVE: {selectedCharacter.name}</p>
      )}

      <CharacterModal
        character={selectedCharacter}
        onClose={handleCloseCharacterModal}
        onLoadIntoForm={handleLoadCharacterIntoForm}
        onDelete={handleDeleteCharacter}
      />
    </main>
  );
}