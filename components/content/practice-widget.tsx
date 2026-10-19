import Link from "next/link";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";
import type { Problem } from "@/lib/types";
import { DIFFICULTY_STYLES } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PracticeWidget({
  problem,
  contextLabel,
}: {
  problem: Problem;
  contextLabel: string;
}) {
  const d = DIFFICULTY_STYLES[problem.difficulty];
  return (
    <aside className="my-8 flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="rounded-lg bg-primary-soft p-2.5 text-primary">
          <Target className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">
            Practice this concept · {contextLabel}
          </p>
          <h3 className="mt-1 text-base font-bold text-foreground">
            {problem.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-semibold",
                d.badge
              )}
            >
              {problem.difficulty}
            </span>
            <span className="flex items-center gap-1 text-faint">
              <CheckCircle2 className="size-3.5" />
              {problem.acceptanceRate}% acceptance
            </span>
            <span className="text-faint">
              {problem.tags.slice(0, 2).join(" · ")}
            </span>
          </div>
        </div>
      </div>
      <Link
        href={`/practice/${problem.slug}`}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover sm:self-center"
      >
        Solve it
        <ArrowRight className="size-4" />
      </Link>
    </aside>
  );
}