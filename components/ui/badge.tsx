import { cn, DIFFICULTY_STYLES } from "@/lib/utils";
import type { Difficulty } from "@/lib/types";

export function DifficultyBadge({
  difficulty,
  size = "sm",
  className,
}: {
  difficulty: Difficulty | null | undefined;
  size?: "sm" | "md";
  className?: string;
}) {
  if (!difficulty) return null;
  const s = DIFFICULTY_STYLES[difficulty];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide",
        s.badge,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} />
      {difficulty}
    </span>
  );
}

export function TagPill({
  children,
  as: Tag = "span",
  suffix,
  className,
  title,
}: {
  children: React.ReactNode;
  as?: "span" | "a";
  suffix?: string;
  className?: string;
  title?: string;
}) {
  return (
    <Tag
      title={title}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs text-muted transition-colors",
        className
      )}
    >
      {children}
      {suffix ? <span className="text-faint"> {suffix}</span> : null}
    </Tag>
  );
}