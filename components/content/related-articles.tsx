import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Article } from "@/lib/types";
import { SectionHeader } from "../ui/section";
import { DifficultyBadge } from "../ui/badge";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;
  return (
    <section className="mt-12" aria-label="Related articles">
      <SectionHeader title="Related Articles" />
      <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/article/${a.slug}`}
            className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-surface transition-shadow hover:shadow-md sm:w-[280px]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <Image
                src={a.thumbnail}
                alt=""
                fill
                sizes="280px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3.5">
              <div className="mb-1.5 flex items-center gap-2">
                <DifficultyBadge difficulty={a.difficulty} />
              </div>
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-link">
                {a.title}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-faint">
                <Clock className="size-3.5" />
                {a.readTimeMin} min read · {a.categoryName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}