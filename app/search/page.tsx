import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Target, GraduationCap, Search } from "lucide-react";
import { searchAll } from "@/lib/repo";
import { DifficultyBadge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search tutorials, practice problems, and courses across GeeksforGeeks.",
};

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";

  const results = q ? searchAll(q) : null;
  const total =
    results === null
      ? 0
      : results.articles.length + results.problems.length + results.courses.length;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <header className="mb-6 text-center">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold text-foreground">
          <Search className="size-6 text-primary" />
          Search GeeksforGeeks
        </h1>
        <form action="/search" method="GET" className="mx-auto mt-4 flex max-w-xl items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 focus-within:ring-2 focus-within:ring-primary">
          <Search className="size-4 shrink-0 text-faint" />
          <input
            defaultValue={q}
            type="search"
            name="q"
            placeholder="Search tutorials, problems, courses…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-faint focus:outline-none"
            aria-label="Search"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
          >
            Search
          </button>
        </form>
      </header>

      {!q ? (
        <p className="text-center text-sm text-faint">
          Try something like &quot;dynamic programming&quot;, &quot;rest api&quot;, or &quot;arrays&quot;.
        </p>
      ) : !results || total === 0 ? (
        <p className="text-center text-sm text-faint">
          No results for &quot;{q}&quot;. Try a broader term.
        </p>
      ) : (
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-sm text-faint">
            {total} result{total === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-foreground">&quot;{q}&quot;</span>
          </p>

          {results.articles.length ? (
            <section aria-label="Articles">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
                <FileText className="size-5 text-primary" /> Tutorials
              </h2>
              <ul className="space-y-2">
                {results.articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/article/${a.slug}`}
                      className="block rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-primary"
                    >
                      <span className="font-semibold text-foreground hover:text-link">
                        {a.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-faint">
                        {a.categoryName} · {a.tags.slice(0, 3).join(", ")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {results.problems.length ? (
            <section aria-label="Problems">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
                <Target className="size-5 text-primary" /> Problems
              </h2>
              <ul className="space-y-2">
                {results.problems.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/practice/${p.slug}`}
                      className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-primary"
                    >
                      <span className="font-semibold text-foreground hover:text-link">
                        {p.title}
                      </span>
                      <DifficultyBadge difficulty={p.difficulty} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {results.courses.length ? (
            <section aria-label="Courses">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
                <GraduationCap className="size-5 text-primary" /> Courses
              </h2>
              <ul className="space-y-2">
                {results.courses.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/courses/${c.slug}`}
                      className="block rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-primary"
                    >
                      <span className="font-semibold text-foreground hover:text-link">
                        {c.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-faint">
                        {c.category} · {c.rating.toFixed(1)} rating
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}