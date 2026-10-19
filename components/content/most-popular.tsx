import Link from "next/link";
import { Eye } from "lucide-react";
import type { Article } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export function NumberedPopularList({
  articles,
  title = "Most Viewed",
}: {
  articles: Article[];
  title?: string;
}) {
  return (
    <section className="rounded-xl border border-line bg-surface p-4">
      <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
        {title}
      </h2>
      <ol className="mt-2">
        {articles.map((a, i) => (
          <li
            key={a.slug}
            className="flex gap-3 border-b border-line py-2.5 last:border-0"
          >
            <span className="mt-0.5 w-6 shrink-0 text-center text-sm font-extrabold text-faint">
              {i + 1}
            </span>
            <div className="min-w-0">
              <Link
                href={`/article/${a.slug}`}
                className="line-clamp-2 text-sm font-medium leading-snug text-muted transition-colors hover:text-link hover:underline"
              >
                {a.title}
              </Link>
              <span className="mt-1 flex items-center gap-1 text-xs text-faint">
                <Eye className="size-3" />
                {formatNumber(a.views)}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}