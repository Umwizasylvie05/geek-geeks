"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, Loader2, Search, SpellCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Suggestion {
  type: "articles" | "problems" | "courses";
  title: string;
  href: string;
  meta?: string;
}

export function SearchAutocomplete({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState(0);
  const [prevResults, setPrevResults] = useState<Suggestion[]>(results);
  if (prevResults !== results) {
    setPrevResults(results);
    setSelected(0);
  }
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const runSearch = async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      const items: Suggestion[] = [
        ...data.articles.map((a: { slug: string; title: string }) => ({
          type: "articles" as const,
          title: a.title,
          href: `/article/${a.slug}`,
          meta: "Article",
        })),
        ...data.problems.map((p: { slug: string; title: string; difficulty: string }) => ({
          type: "problems" as const,
          title: p.title,
          href: `/practice/${p.slug}`,
          meta: p.difficulty,
        })),
        ...data.courses.map((c: { slug: string; title: string }) => ({
          type: "courses" as const,
          title: c.title,
          href: `/courses/${c.slug}`,
          meta: "Course",
        })),
      ];
      setResults(items.slice(0, 8));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (value: string) => {
    setQ(value);
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 220);
  };

  const go = (href: string) => {
    setOpen(false);
    setQ("");
    onNavigate?.();
    router.push(href);
  };

  const submit = () => {
    if (results[selected]) {
      go(results[selected].href);
      return;
    }
    setOpen(false);
    onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search articles, problems, courses…"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-suggestions"
          aria-label="Search"
          className="w-full rounded-lg border border-line bg-surface-2 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-faint transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 md:w-56 md:focus:w-80"
        />
        {loading ? (
          <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-faint" />
        ) : null}
      </div>

      {open && q.trim().length >= 2 ? (
        <div className="fade-in absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
          {loading ? (
            <p className="px-4 py-6 text-center text-sm text-faint">Searching…</p>
          ) : results.length === 0 ? (
            <div className="px-4 py-6">
              <p className="text-sm text-muted">No results for “{q}”.</p>
              <button
                onClick={() => router.push(`/search?q=${encodeURIComponent(q)}`)}
                className="mt-2 text-sm font-medium text-link hover:underline"
              >
                See all results →
              </button>
            </div>
          ) : (
            <ul id="search-suggestions" role="listbox" aria-label="Suggestions" className="max-h-96 overflow-y-auto py-1">
              {results.map((r, i) => (
                <li key={r.href}>
                  <button
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => go(r.href)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                      i === selected ? "bg-surface-2" : ""
                    )}
                  >
                    {r.type === "articles" ? (
                      <BookOpen className="size-4 shrink-0 text-primary" />
                    ) : r.type === "problems" ? (
                      <SpellCheck2 className="size-4 shrink-0 text-medium" />
                    ) : (
                      <GraduationCap className="size-4 shrink-0 text-amber-500" />
                    )}
                    <span className="min-w-0 flex-1 truncate text-foreground">
                      {r.title}
                    </span>
                    <span className="shrink-0 text-xs text-faint">{r.meta}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => submit()}
                  className="w-full border-t border-line px-4 py-2.5 text-left text-xs font-medium text-link hover:bg-surface-2"
                >
                  View all results for “{q}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}