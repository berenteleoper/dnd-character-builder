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
          const value = character.abilities[ability.key];

          return (
            <AbilityCard
              key={ability.key}
              name={ability.label}
              value={value}
              modifier={calculateModifier(value)}
              accentColor={theme.primary}
              borderColor={theme.border}
              backgroundColor="#fffaf3"
              textColor="#2f241c"
            />
          );
        })}
      </div>
    </section>
  );
}