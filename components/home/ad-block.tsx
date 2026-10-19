export function AdBlock({
  label = "Advertisement",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface-2 text-center ${className ?? ""}`}
    >
      <span className="text-2xl">📢</span>
      <p className="mt-2 text-sm font-semibold text-muted">{label}</p>
      <p className="mt-1 text-xs text-faint">Placeholder slot</p>
    </div>
  );
}