import { calculateModifier } from "@/lib/ability";
import type { Character } from "@/types/character";

const sampleCharacter: Character = {
  name: "Arin",
  race: "Elf",
  class: "Wizard",
  level: 1,
  abilities: {
    strength: 8,
    dexterity: 14,
    constitution: 12,
    intelligence: 16,
    wisdom: 13,
    charisma: 10,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">DnD Character Builder</h1>
        <p className="mb-8 text-slate-300">
          Character Sheet
        </p>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">{sampleCharacter.name}</h2>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <p><span className="font-semibold">Race:</span> {sampleCharacter.race}</p>
            <p><span className="font-semibold">Class:</span> {sampleCharacter.class}</p>
            <p><span className="font-semibold">Level:</span> {sampleCharacter.level}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Strength</p>
              <p className="text-xl font-bold">
                {sampleCharacter.abilities.strength} (
                {calculateModifier(sampleCharacter.abilities.strength) >= 0 ? "+" : ""}
                {calculateModifier(sampleCharacter.abilities.strength)})
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Dexterity</p>
              <p className="text-xl font-bold">
                {sampleCharacter.abilities.dexterity} (
                {calculateModifier(sampleCharacter.abilities.dexterity) >= 0 ? "+" : ""}
                {calculateModifier(sampleCharacter.abilities.dexterity)})
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Constitution</p>
              <p className="text-xl font-bold">
                {sampleCharacter.abilities.constitution} (
                {calculateModifier(sampleCharacter.abilities.constitution) >= 0 ? "+" : ""}
                {calculateModifier(sampleCharacter.abilities.constitution)})
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Intelligence</p>
              <p className="text-xl font-bold">
                {sampleCharacter.abilities.intelligence} (
                {calculateModifier(sampleCharacter.abilities.intelligence) >= 0 ? "+" : ""}
                {calculateModifier(sampleCharacter.abilities.intelligence)})
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Wisdom</p>
              <p className="text-xl font-bold">
                {sampleCharacter.abilities.wisdom} (
                {calculateModifier(sampleCharacter.abilities.wisdom) >= 0 ? "+" : ""}
                {calculateModifier(sampleCharacter.abilities.wisdom)})
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Charisma</p>
              <p className="text-xl font-bold">
                {sampleCharacter.abilities.charisma} (
                {calculateModifier(sampleCharacter.abilities.charisma) >= 0 ? "+" : ""}
                {calculateModifier(sampleCharacter.abilities.charisma)})
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
