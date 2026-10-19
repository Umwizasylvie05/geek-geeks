import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles, getProblemBySlug, getMostViewed, allArticleSlugs, getComments } from "@/lib/repo";
import { ArticleBody, tocFromContent } from "@/components/content/body";
import { TableOfContents } from "@/components/content/toc";
import { ActionBar } from "@/components/content/action-bar";
import { CommentSection } from "@/components/content/comments";
import { RelatedArticles } from "@/components/content/related-articles";
import { PracticeWidget } from "@/components/content/practice-widget";
import { NumberedPopularList } from "@/components/content/most-popular";
import { DifficultyBadge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Avatar } from "@/components/ui/avatar";
import { AdBlock } from "@/components/home/ad-block";
import { formatDate, timeAgo } from "@/lib/utils";
import { Clock, Eye, BookOpenText } from "lucide-react";

export const revalidate = false;

export function generateStaticParams() {
  return allArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/article/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.thumbnail ? [{ url: article.thumbnail }] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/article/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc = tocFromContent(article.content);
  const related = getRelatedArticles(article, 6);
  const practiceProblem = article.relatedProblemSlug
    ? getProblemBySlug(article.relatedProblemSlug)
    : undefined;
  const mostPopular = getMostViewed(8);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <header className="mb-6">
        <Breadcrumb
          crumbs={[
            { label: article.categoryName, href: `/category/${article.categorySlug}` },
            { label: article.title },
          ]}
        />
      </header>

      <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)_300px]">
        {/* TOC */}
        <aside className="hidden lg:block" aria-label="On this page sidebar">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8">
            <TableOfContents entries={toc} />
            <div className="mt-4 rounded-xl border border-line bg-surface p-4">
              <h3 className="text-sm font-bold text-foreground">Quick links</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                <li>
                  <Link href="#comments" className="transition-colors hover:text-link">
                    View comments
                  </Link>
                </li>
                <li>
                  <Link href="/practice" className="transition-colors hover:text-link">
                    Browse problems
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Article */}
        <article className="min-w-0 rounded-xl border border-line bg-surface px-4 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2">
            {article.difficulty ? <DifficultyBadge difficulty={article.difficulty} /> : null}
            <Link
              href={`/category/${article.categorySlug}`}
              className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-link hover:underline"
            >
              {article.categoryName}
            </Link>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
            {article.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {article.description}
          </p>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 pb-4 text-sm text-faint">
            <span className="flex items-center gap-2">
              <Avatar name={article.author} size="md" />
              <span>
                <span className="font-semibold text-foreground">{article.author}</span>
                <span className="block text-xs text-faint">Author</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {article.readTimeMin} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-4" /> {article.views.toLocaleString()} views
            </span>
            <span>{timeAgo(article.updatedAt)}</span>
            <span className="text-faint/80">·</span>
            <span>Updated {formatDate(article.updatedAt)}</span>
          </div>

          <ActionBar
            targetType="article"
            targetSlug={article.slug}
            likes={article.likes}
          />

          <ArticleBody article={article} />

          {practiceProblem ? (
            <PracticeWidget
              problem={practiceProblem}
              contextLabel={article.categoryName}
            />
          ) : null}

          <CommentSection articleId={article.id} count={getComments(article.id).length} />

          <RelatedArticles articles={related} />
        </article>

        {/* Right rail */}
        <aside className="hidden lg:block" aria-label="Article sidebar">
          <div className="sticky top-20 space-y-5 pb-8">
            <div className="rounded-xl bg-gradient-to-br from-primary-soft to-surface p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
                <BookOpenText className="size-4" />
                Keep learning
              </h3>
              <p className="mt-1 text-sm text-muted">
                Practice what you just read with real problems in the GeeksforGeeks
                editor.
              </p>
              <Link
                href="/practice"
                className="mt-3 inline-block rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary hover:bg-primary-hover"
              >
                Go to practice
              </Link>
            </div>
            <NumberedPopularList articles={mostPopular} title="Popular reads" />
            <AdBlock className="lg:sticky lg:top-[calc(20rem)]" />
          </div>
        </aside>
      </div>
    </div>
  );
}