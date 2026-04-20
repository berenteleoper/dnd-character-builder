import AbilityCard from "./AbilityCard";
import { abilityList } from "../data/abilities";
import { calculateModifier } from "../lib/ability";
import { getClassTheme } from "../lib/theme";
import type { Character } from "../types/character";

type CharacterPreviewProps = {
  character: Character;
};

export default function CharacterPreview({
  character,
}: CharacterPreviewProps) {
  const theme = getClassTheme(character.class);

  return (
    <section
      className="rounded-2xl border-2 p-6 shadow-lg"
      style={{
        backgroundColor: theme.panel,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <div
        className="mb-6 rounded-xl border px-4 py-4"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.soft,
        }}
      >
        <h2
          className="text-3xl font-bold tracking-wide"
          style={{ color: theme.primary }}
        >
          {character.name || "Unnamed Character"}
        </h2>

        <p className="mt-2 text-sm font-medium">
          {character.race} • {character.class} • Level {character.level}
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {abilityList.map((ability) => {
          const value = character.abilities[ability.key];

          return (
            <AbilityCard
              key={ability.key}
              name={ability.label}
              value={value}
              modifier={calculateModifier(value)}
              accentColor={theme.primary}
              borderColor={theme.border}
              backgroundColor={theme.soft}
              textColor={theme.text}
            />
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: theme.border,
            backgroundColor: "rgba(255,255,255,0.28)",
          }}
        >
          <h3
            className="mb-3 text-lg font-bold uppercase tracking-wide"
            style={{ color: theme.primary }}
          >
            Character Summary
          </h3>

          <div className="space-y-2 text-sm">
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
        </div>

        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: theme.border,
            backgroundColor: "rgba(255,255,255,0.28)",
          }}
        >
          <h3
            className="mb-3 text-lg font-bold uppercase tracking-wide"
            style={{ color: theme.primary }}
          >
            Notes
          </h3>

          <p className="text-sm opacity-80">
            Bu alanı ileride class features, equipment, spells ve notes için
            olacak.
          </p>
        </div>
      </div>
    </section>
  );
}