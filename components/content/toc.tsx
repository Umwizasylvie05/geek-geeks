"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "./body";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!entries.length) return;
    const ids = entries.map((e) => e.id).filter(Boolean);
    const observer = new IntersectionObserver(
      (obs) => {
        const visible = obs
          .filter((o) => o.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entries]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav aria-label="On this page" className="rounded-xl border border-line bg-surface p-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-bold text-foreground md:pointer-events-none md:cursor-default"
      >
        <span className="flex items-center gap-2">
          <List className="size-4 text-primary" />
          On this page
        </span>
        <span className="text-xs font-normal text-faint md:hidden">
          {open ? "Hide" : "Show"}
        </span>
      </button>
      <ul
        className={cn(
          "mt-3 space-y-0.5 border-t border-line pt-3 text-sm",
          open ? "block" : "hidden",
          "md:block"
        )}
      >
        {entries.map((e) => (
          <li key={e.id}>
            <button
              onClick={() => scrollTo(e.id)}
              className={cn(
                "block w-full rounded-md px-2 py-1.5 text-left transition-colors",
                e.level === 3 ? "pl-6 text-[13px]" : "",
                activeId === e.id
                  ? "bg-toc-active font-medium text-primary"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              )}
            >
              {e.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}