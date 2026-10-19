import Link from "next/link";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import type { Article } from "@/lib/types";
import { cn, formatNumber, timeAgo } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { DifficultyBadge, TagPill } from "../ui/badge";

export function ArticleRow({
  article,
  big,
  className,
}: {
  article: Article;
  big?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group rounded-xl border border-line bg-surface p-4 transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <DifficultyBadge difficulty={article.difficulty} />
        <Link
          href={`/category/${article.categorySlug}`}
          className="text-xs font-medium text-link hover:underline"
        >
          {article.categoryName}
        </Link>
        <span className="ml-auto text-xs text-faint">
          {timeAgo(article.updatedAt)}
        </span>
      </div>
      <h3
        className={cn(
          "font-semibold leading-snug text-foreground transition-colors group-hover:text-link",
          big ? "text-lg" : "text-[15px]"
        )}
      >
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-faint">
        {article.content[0]?.type === "p" ? article.content[0].text : ""}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {article.tags.slice(0, 3).map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <Avatar name={article.author} size="sm" />
          <span className="text-muted">{article.author}</span>
        </span>
        <span className="flex items-center gap-2.5">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {article.readTimeMin}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="size-3.5" /> {formatNumber(article.views)}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp className="size-3.5" /> {formatNumber(article.likes)}
          </span>
        </span>
      </div>
    </article>
  );
}