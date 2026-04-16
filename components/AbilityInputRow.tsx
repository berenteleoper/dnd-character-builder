import { calculateModifier } from "@/lib/ability";
import type { AbilityName } from "@/types/character";

type AbilityInputRowProps = {
    abilityKey: AbilityName;
    label: string;
    value: number;
    onChange: (abilityKey: AbilityName, nextValue: number) => void;
};

export default function AbilityInputRow({
    abilityKey,
    label,
    value,
    onChange,
}: AbilityInputRowProps) {
    const modifier = calculateModifier(value);

    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
         <div>
        <p className="font-medium">{label}</p>
        
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          max={20}
          value={value}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            const numericValue = e.target.valueAsNumber;
            onChange(abilityKey, Number.isNaN(numericValue) ? 1 : numericValue);
          }}
          className="w-20 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-center outline-none"
        />

        <div className="min-w-[56px] rounded-lg bg-slate-900 px-3 py-2 text-center font-semibold">
          {modifier >= 0 ? "+" : ""}
          {modifier}
        </div>
      </div>
    </div>
  );
}   
