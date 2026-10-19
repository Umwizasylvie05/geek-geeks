import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Target } from "lucide-react";
import { getProblems, platformStats } from "@/lib/repo";
import { ProblemFilters } from "@/components/practice/filters";
import { Pagination } from "@/components/ui/pagination";
import { DifficultyBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Practice Problems",
  description:
    "Solve coding problems in C++, Java, Python, and JavaScript with in-browser editor and difficulty tracking.",
};

export default async function PracticePage({
  searchParams,
}: PageProps<"/practice">) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(String(sp.page ?? "1"), 10) || 1);
  const difficulty = typeof sp.difficulty === "string" ? sp.difficulty : "All";
  const sort = typeof sp.sort === "string" ? sp.sort : "acceptance";
  const query = typeof sp.q === "string" ? sp.q : "";
  const tags = (typeof sp.tags === "string" ? [sp.tags] : Array.isArray(sp.tags) ? sp.tags : []).filter(
    (t) => typeof t === "string"
  );

  const { items, total, pageCount, allTags } = getProblems({
    difficulty,
    tags,
    sort: sort as "difficulty" | "newest" | "acceptance",
    query,
    page,
    perPage: 20,
  });

  const stats = platformStats();
  const acceptance = Math.round((stats.solved / stats.problems) * 100);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <header className="mb-5">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
          <Target className="size-6 text-primary" />
          Practice Problems
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-faint">
          Hand-picked problems across every major topic. Difficulty-track your
          progress and solve in the language you are learning. Showing{" "}
          <span className="font-semibold text-foreground">{total}</span>{" "}
          problems.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">
            <Flame className="size-4" /> {stats.solved} solved by the community
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-muted">
            Avg acceptance {acceptance}%
          </span>
        </div>
      </header>

      <ProblemFilters
        difficulty={difficulty}
        tags={tags}
        sort={sort}
        query={query}
        allTags={allTags}
        page={page}
      />

      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="min-w-full divide-y divide-line text-left">
          <thead>
            <tr className="bg-surface-2 text-xs uppercase tracking-wide text-faint">
              <th className="px-4 py-3 font-semibold">Problem</th>
              <th className="px-4 py-3 font-semibold">Difficulty</th>
              <th className="px-4 py-3 font-semibold">Acceptance</th>
              <th className="hidden px-4 py-3 font-semibold lg:table-cell">
                Asked by
              </th>
              <th className="px-4 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-surface-2">
                <td className="px-4 py-3.5">
                  <div className="min-w-[220px]">
                    <Link
                      href={`/practice/${p.slug}`}
                      className="font-semibold text-foreground transition-colors hover:text-link"
                    >
                      {p.title}
                    </Link>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <DifficultyBadge difficulty={p.difficulty} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-3">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          p.acceptanceRate >= 55
                            ? "bg-easy"
                            : p.acceptanceRate >= 35
                              ? "bg-medium"
                              : "bg-hard"
                        )}
                        style={{ width: `${p.acceptanceRate}%` }}
                      />
                    </div>
                    <span className="text-xs text-faint">
                      {p.acceptanceRate}%
                    </span>
                  </div>
                </td>
                <td className="hidden px-4 py-3.5 lg:table-cell">
                  <span className="line-clamp-1 max-w-[180px] text-xs text-faint">
                    {p.companies.slice(0, 2).join(", ")}
                    {p.companies.length > 2 ? " +" : ""}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Link
                    href={`/practice/${p.slug}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary transition-colors hover:bg-primary-hover"
                  >
                    Solve <ArrowRight className="size-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination basePath="/practice" page={page} pageCount={pageCount} />
      </div>
    </div>
  );
}