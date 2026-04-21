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
  borderColor = "#b14545",
  backgroundColor = "#fffaf3",
  textColor = "#2f241c",
}: AbilityCardProps) {
  return (
    <div
      className="rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        borderColor,
        backgroundColor,
        color: textColor,
      }}
    >
      <p
        className="text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: accentColor }}
      >
        {name}
      </p>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-6xl font-bold leading-none">{value}</p>

        <div className="rounded-xl bg-[#f4ecdf] px-3 py-2">
          <p className="text-xl font-semibold" style={{ color: accentColor }}>
            {modifier >= 0 ? "+" : ""}
            {modifier}
          </p>
        </div>
      </div>
    </div>
  );
}