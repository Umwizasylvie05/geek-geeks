import { notFound } from "next/navigation";
import { BookOpenText } from "lucide-react";
import { getCategoryBySlug, categoryArticles, buildSidebar, getMostViewed } from "@/lib/repo";
import { CategoryLayout } from "@/components/content/category-layout";
import { CategorySidebar, SidebarToggleButton } from "@/components/content/sidebar";
import { MobileTopicsButton } from "@/components/content/mobile-topics";
import { ArticleCard } from "@/components/content/article-card";
import { NumberedPopularList } from "@/components/content/most-popular";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { AdBlock } from "@/components/home/ad-block";

export function generateStaticParams() {
  return ["dsa", "languages", "web-dev", "system-design", "interview-prep", "cs-fundamentals"].map(
    (slug) => ({ slug })
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const pageParam = Array.isArray(page) ? page[0] : page;
  const pageNum = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const { items, total, pageCount } = categoryArticles(category.id, pageNum);
  const sidebarItems = buildSidebar(slug);
  const mostViewed = getMostViewed(8);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Explore", href: "/category/dsa" },
              { label: category.name },
            ]}
          />
          <h1 className="mt-2 flex items-center gap-2 text-2xl font-extrabold text-foreground">
            <BookOpenText className="size-6 text-primary" />
            {category.name}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-faint">
            {category.description} · {total} tutorials
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SidebarToggleButton />
          <MobileTopicsButton items={sidebarItems} title={category.name} />
        </div>
      </header>

      <CategoryLayout
        sidebar={
          <CategorySidebar
            items={sidebarItems}
            title={category.name}
            activeSlug={slug}
          />
        }
        rail={
          <div className="sticky top-20 space-y-5 pb-8">
            <NumberedPopularList articles={mostViewed} title="Popular in DSA" />
            <AdBlock />
          </div>
        }
      >
        <section aria-label="Articles">
          {items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((a, i) => (
                <ArticleCard key={a.slug} article={a} priority={pageNum === 1 && i < 3} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-line bg-surface p-8 text-center text-sm text-faint">
              No tutorials in this section yet — check back soon.
            </p>
          )}
          <div className="mt-6">
            <Pagination
              basePath={`/category/${slug}`}
              page={pageNum}
              pageCount={pageCount}
            />
          </div>
        </section>
      </CategoryLayout>
    </div>
  );
}