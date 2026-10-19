"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const SORTS = [
  { value: "acceptance", label: "Highest acceptance" },
  { value: "difficulty", label: "Difficulty" },
  { value: "newest", label: "Newest" },
];

export function ProblemFilters({
  difficulty,
  tags,
  sort,
  query,
  allTags,
  page,
}: {
  difficulty: string;
  tags: string[];
  sort: string;
  query: string;
  allTags: string[];
  page: number;
}) {
  const router = useRouter();
  const [text, setText] = useState(query);
  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setText(query);
  }
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const push = (next: Record<string, string | string[] | undefined>) => {
    const p = new URLSearchParams();
    const merged: Record<string, string | string[] | undefined> = {
      difficulty,
      tags: tags.length ? tags : undefined,
      sort,
      query: query || undefined,
      page: page > 1 ? String(page) : undefined,
      ...next,
    };
    for (const [k, v] of Object.entries(merged)) {
      if (v === undefined) continue;
      if (Array.isArray(v)) {
        v.forEach((item) => p.append(k, item));
      } else if (v) {
        p.set(k, v);
      }
    }
    const qs = p.toString();
    router.push(qs ? `/practice?${qs}` : "/practice");
  };

  const toggleTag = (t: string) => {
    const nextTags = tags.includes(t)
      ? tags.filter((x) => x !== t)
      : [...tags, t];
    push({ tags: nextTags.length ? nextTags : undefined, page: undefined });
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    push({ query: text.trim() || undefined, page: undefined });
  };

  return (
    <div className="mb-5 space-y-3">
      <form
        onSubmit={submitSearch}
        className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5"
      >
        <Search className="size-4 shrink-0 text-faint" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search problems (e.g. prefix sum, palindrome)…"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-faint focus:outline-none"
          aria-label="Search problems"
        />
        {text ? (
          <button
            type="button"
            onClick={() => {
              setText("");
              push({ query: undefined, page: undefined });
            }}
            aria-label="Clear search"
            className="rounded p-1 text-faint hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="difficulty-sel" className="text-sm text-faint">
            Difficulty
          </label>
          <select
            id="difficulty-sel"
            value={difficulty}
            onChange={(e) => push({ difficulty: e.target.value, page: undefined })}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-sel" className="text-sm text-faint">
            Sort
          </label>
          <select
            id="sort-sel"
            value={sort}
            onChange={(e) => push({ sort: e.target.value, page: undefined })}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsTagsOpen((o) => !o)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2",
              tags.length && "border-primary text-primary"
            )}
          >
            Tags
            <ChevronDown className="size-3.5" />
            {tags.length ? (
              <span className="rounded-full bg-primary px-1.5 text-[10px] font-bold text-on-primary">
                {tags.length}
              </span>
            ) : null}
          </button>
          {isTagsOpen ? (
            <>
              <button
                aria-label="Close tag picker"
                onClick={() => setIsTagsOpen(false)}
                className="fixed inset-0 z-10 cursor-default"
              />
              <div className="absolute z-20 mt-2 w-64 rounded-xl border border-line bg-surface p-3 shadow-lg">
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTag(t)}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                        tags.includes(t)
                          ? "border-primary bg-primary text-on-primary"
                          : "border-line bg-surface-2 text-muted hover:bg-surface-3"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}