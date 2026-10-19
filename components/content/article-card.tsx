import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import type { Article } from "@/lib/types";
import { formatNumber, formatDate } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { DifficultyBadge } from "../ui/badge";

export function ArticleCard({
  article,
  priority,
}: {
  article: Article;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-shadow hover:shadow-md">
      <Link
        href={`/article/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-surface-2"
        aria-hidden
        tabIndex={-1}
      >
        <Image
          src={article.thumbnail}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          {article.categoryName}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={article.difficulty} />
          {article.subcategory ? (
            <Link
              href={`/category/${article.subcategory}`}
              className="text-xs font-medium text-link hover:underline"
            >
              {article.subcategory.replace(/-/g, " ")}
            </Link>
          ) : null}
        </div>
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-link">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="line-clamp-1 text-xs text-faint">
          Updated {formatDate(article.updatedAt)}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs text-faint">
          <span className="flex items-center gap-1.5">
            <Avatar name={article.author} size="sm" />
            <span className="max-w-[110px] truncate text-muted">{article.author}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readTimeMin}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-3.5" />
              {formatNumber(article.views)}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="size-3.5" />
              {formatNumber(article.likes)}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}