import { calculateModifier } from "@/lib/ability";
import type {
  AbilityGenerationMethod,
  AbilityName,
  StandardArrayValue,
} from "../types/character";

type AbilityInputRowProps = {
  abilityKey: AbilityName;
  label: string;
  value: number;
  generationMethod: AbilityGenerationMethod;
  selectedStandardArrayValue?: StandardArrayValue;
  availableStandardArrayValues?: StandardArrayValue[];
  pointBuyValues?: number[];
  pointBuyUsedPoints?: number;
  onChange: (abilityKey: AbilityName, nextValue: number) => void;
  onStandardArrayChange?: (
    abilityKey: AbilityName,
    value: StandardArrayValue
  ) => void;
};

export default function AbilityInputRow({
  abilityKey,
  label,
  value,
  generationMethod,
  selectedStandardArrayValue,
  availableStandardArrayValues = [],
  pointBuyValues = [],
  pointBuyUsedPoints = 0,
  onChange,
  onStandardArrayChange,
}: AbilityInputRowProps) {
  const modifier = calculateModifier(value);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#ddd0bc] bg-[#fdf8f1] px-4 py-4 shadow-sm">
      <div>
        <p className="font-medium text-[#2f241c]">{label}</p>
      </div>

      <div className="flex items-center gap-3">
        {generationMethod === "standardArray" ? (
          <select
            value={selectedStandardArrayValue ?? ""}
            onChange={(e) => {
              if (!e.target.value || !onStandardArrayChange) return;

              onStandardArrayChange(
                abilityKey,
                Number(e.target.value) as StandardArrayValue
              );
            }}
            className="w-24 rounded-xl border border-[#d6c7b2] bg-white px-3 py-2 text-center text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          >
            <option value="">--</option>

            {[
              ...(selectedStandardArrayValue ? [selectedStandardArrayValue] : []),
              ...availableStandardArrayValues,
            ]
              .filter((value, index, array) => array.indexOf(value) === index)
              .sort((a, b) => b - a)
              .map((arrayValue) => (
                <option key={arrayValue} value={arrayValue}>
                  {arrayValue}
                </option>
              ))}
          </select>
        ) : generationMethod === "pointBuy" ? (
          <select
            value={value}
            onChange={(e) => {
              onChange(abilityKey, Number(e.target.value));
            }}
            className="w-24 rounded-xl border border-[#d6c7b2] bg-white px-3 py-2 text-center text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          >
            {pointBuyValues.map((pointValue) => (
              <option key={pointValue} value={pointValue}>
                {pointValue}
              </option>
            ))}
          </select>
        ) : (
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
            className="w-20 rounded-xl border border-[#d6c7b2] bg-white px-3 py-2 text-center text-[#2f241c] outline-none transition focus:border-[#b14545] focus:ring-2 focus:ring-[#b14545]/20"
          />
        )}

        <div className="min-w-[56px] rounded-xl bg-[#efe3d3] px-3 py-2 text-center font-semibold text-[#7a2f2f]">
          {modifier >= 0 ? "+" : ""}
          {modifier}
        </div>
      </div>
    </div>
  );
}