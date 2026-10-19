"use client";

import { useState } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Module } from "@/lib/types";

export function ModuleList({ modules }: { modules: Module[] }) {
  const [open, setOpen] = useState<number | null>(
    modules.length ? 0 : null
  );

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      {modules.map((m, i) => {
        const expanded = open === i;
        return (
          <div key={m.title} className="border-b border-line last:border-0">
            <button
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-2"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="font-semibold text-foreground">{m.title}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-faint">
                {m.lessons.length} lessons ·{" "}
                {m.lessons.reduce((a, l) => a + l.durationMin, 0)} min
                <ChevronDown
                  className={cn("size-4 transition-transform", expanded && "rotate-180")}
                />
              </span>
            </button>
            {expanded ? (
              <ul className="border-t border-line bg-surface-2/50 px-4 py-2">
                {m.lessons.map((l, li) => (
                  <li
                    key={l.title}
                    className="flex items-center justify-between gap-3 rounded-md px-2 py-2 text-sm text-muted hover:bg-surface"
                  >
                    <span className="flex items-center gap-2">
                      <PlayCircle className="size-4 shrink-0 text-faint" />
                      {li + 1}. {l.title}
                    </span>
                    <span className="shrink-0 text-xs text-faint">
                      {l.durationMin} min
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}