type AbilityCardProps = {
  name: string;
  value: number;
  modifier: number;
  accentColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
};

export default function AbilityCard({
  name,
  value,
  modifier,
  accentColor = "#9f2f2f",
  borderColor = "#7f1d1d",
  backgroundColor = "#f4d8d8",
  textColor = "#2f241c",
}: AbilityCardProps) {
  return (
    <div
      className="rounded-xl border-2 p-4 shadow-sm"
      style={{
        borderColor,
        backgroundColor,
        color: textColor,
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color: accentColor }}
      >
        {name}
      </p>

      <div className="mt-2 flex items-end justify-between">
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-lg font-semibold">
          {modifier >= 0 ? "+" : ""}
          {modifier}
        </p>
      </div>
    </div>
  );
}