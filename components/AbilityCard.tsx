type AbilityCardProps = {
  name: string;
  value: number;
  modifier: number;
};

export default function AbilityCard({
  name,
  value,
  modifier,
}: AbilityCardProps) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <p className="text-sm text-slate-400">{name}</p>
      <p className="text-xl font-bold">
        {value} ({modifier >= 0 ? "+" : ""}
        {modifier})
      </p>
    </div>
  );
}