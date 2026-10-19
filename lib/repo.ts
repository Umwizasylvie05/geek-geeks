import type { Article, Category, Course, Problem } from "./types";
import type { SidebarItem } from "./seed/categories";
import {
  ALL_CATEGORIES,
  CATEGORY_MAP,
  CATEGORY_TREE,
  categoryRoot,
} from "./seed/categories";
import { ARTICLES, getArticle } from "./seed/articles";
import { PROBLEMS, getProblem } from "./seed/problems";
import { COURSES, getCourse } from "./seed/courses";
import { getCommentsForArticle } from "./seed/comments";

export function allArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}

export const PAGE_SIZE = 9;

export function categoryTree(): Category[] {
  return CATEGORY_TREE;
}

export function allCategories(): Category[] {
  return ALL_CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORY_MAP[slug];
}

function descendantIds(slug: string): Set<string> {
  const root = CATEGORY_MAP[slug];
  if (!root) return new Set();
  const collect = (c: Category): string[] => [
    c.id,
    ...c.children.flatMap(collect),
  ];
  return new Set(collect(root));
}

export function categoryArticles(
  slug: string,
  page = 1,
  perPage = PAGE_SIZE
): { items: Article[]; total: number; pageCount: number } {
  const ids = descendantIds(slug);
  const items = ARTICLES.filter((a) => ids.has(a.categoryId));
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), pageCount);
  return {
    items: items.slice((safePage - 1) * perPage, safePage * perPage),
    total,
    pageCount,
  };
}

export function countArticlesIn(slug: string): number {
  return descendantIds(slug).size > 0
    ? ARTICLES.filter((a) => descendantIds(slug).has(a.categoryId)).length
    : 0;
}

export function buildSidebar(rootSlug: string): SidebarItem[] {
  const root = categoryRoot(rootSlug);
  if (!root) return [];
  const build = (c: Category): SidebarItem => {
    return {
      id: c.id,
      label: c.name,
      href: `/category/${c.id}`,
      count: countArticlesIn(c.id),
      children: c.children.map((ch) => build(ch)),
    };
  };
  return root.children.map((ch) => build(ch));
}

export function allArticles(): Article[] {
  return ARTICLES;
}

export function articleCount(): number {
  return ARTICLES.length;
}

export function getTrendingArticles(n = 8): Article[] {
  return [...ARTICLES]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, n);
}

export function getLatestArticles(n = 8): Article[] {
  return [...ARTICLES]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, n);
}

export function getMostViewed(n = 10): Article[] {
  return [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, n);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticle(slug);
}

export function getRelatedArticles(article: Article, n = 6): Article[] {
  const sameCat = ARTICLES.filter(
    (a) => a.categoryId === article.categoryId && a.slug !== article.slug
  );
  const sameTag = ARTICLES.filter(
    (a) =>
      a.slug !== article.slug &&
      !sameCat.includes(a) &&
      a.tags.some((t) => article.tags.includes(t))
  );
  return [...sameCat, ...sameTag].slice(0, n);
}

export interface ProblemFilter {
  difficulty?: string;
  tags?: string[];
  companies?: string[];
  query?: string;
  sort?: "difficulty" | "newest" | "acceptance";
  page?: number;
  perPage?: number;
}

export interface ProblemResult {
  items: Problem[];
  total: number;
  pageCount: number;
  allTags: string[];
  allCompanies: string[];
}

export function getProblems(filter: ProblemFilter = {}): ProblemResult {
  let items = [...PROBLEMS];
  if (filter.difficulty && filter.difficulty !== "All") {
    items = items.filter((p) => p.difficulty === filter.difficulty);
  }
  if (filter.tags && filter.tags.length) {
    items = items.filter((p) =>
      filter.tags!.every((t) => p.tags.includes(t))
    );
  }
  if (filter.companies && filter.companies.length) {
    items = items.filter((p) =>
      filter.companies!.some((c) => p.companies.includes(c))
    );
  }
  if (filter.query) {
    const q = filter.query.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  switch (filter.sort) {
    case "difficulty": {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      items.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
      break;
    }
    case "newest":
      items.sort((a, b) => b.id.localeCompare(a.id));
      break;
    default:
      items.sort((a, b) => b.acceptanceRate - a.acceptanceRate);
  }
  const perPage = filter.perPage ?? 25;
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(Math.max(1, filter.page ?? 1), pageCount);
  const allTags = [...new Set(PROBLEMS.flatMap((p) => p.tags))].sort();
  const allCompanies = [...new Set(PROBLEMS.flatMap((p) => p.companies))].sort();
  return {
    items: items.slice((page - 1) * perPage, page * perPage),
    total,
    pageCount,
    allTags: allTags.slice(0, 12),
    allCompanies: allCompanies.slice(0, 12),
  };
}

export function getProblemBySlug(slug: string): Problem | undefined {
  return getProblem(slug);
}

export function problemCount(): number {
  return PROBLEMS.length;
}

export function courseCategories(): { name: string; slug: string }[] {
  return [...new Set(COURSES.map((c) => c.category))].map((name) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export function getCourses(filter: { category?: string } = {}): Course[] {
  if (!filter.category || filter.category === "All") return COURSES;
  return COURSES.filter(
    (c) => c.category.toLowerCase().replace(/\s+/g, "-") === filter.category
  );
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getCourse(slug);
}

export function relatedCourses(category: string, n = 3): Course[] {
  return COURSES.filter((c) => c.category === category).slice(0, n);
}

export function getComments(articleId: string) {
  return getCommentsForArticle(articleId);
}

export { getArticle } from "./seed/articles";

export interface SearchResults {
  articles: Article[];
  problems: Problem[];
  courses: Course[];
}

function scoreText(haystack: string, terms: string[]): number {
  const text = haystack.toLowerCase();
  return terms.reduce(
    (acc, t) => (text.includes(t) ? acc + (text.startsWith(t) ? 3 : 1) : acc),
    0
  );
}

export function searchAll(q: string): SearchResults {
  const terms = q
    .toLowerCase()
    .trim()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  if (!terms.length) return { articles: [], problems: [], courses: [] };

  const articleText = (a: Article) =>
    `${a.title} ${a.categoryName} ${a.tags.join(" ")} ${a.author}`;
  const articles = ARTICLES.map((a) => ({ a, s: scoreText(articleText(a), terms) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .map((x) => x.a)
    .slice(0, 8);

  const problemText = (p: Problem) =>
    `${p.title} ${p.description} ${p.tags.join(" ")} ${p.companies.join(" ")}`;
  const problems = PROBLEMS.map((p) => ({ p, s: scoreText(problemText(p), terms) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .map((x) => x.p)
    .slice(0, 6);

  const courseText = (c: Course) =>
    `${c.title} ${c.tagline} ${c.description} ${c.category} ${c.instructor}`;
  const courses = COURSES.map((c) => ({ c, s: scoreText(courseText(c), terms) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .map((x) => x.c)
    .slice(0, 6);

  return { articles, problems, courses };
}

export function platformStats() {
  const submissions = PROBLEMS.reduce((acc, p) => acc + p.submissions, 0);
  const solved = PROBLEMS.reduce((acc, p) => acc + p.solved, 0);
  return {
    articles: ARTICLES.length,
    problems: PROBLEMS.length,
    courses: COURSES.length,
    totalViews: ARTICLES.reduce((acc, a) => acc + a.views, 0),
    solved,
    submissions,
  };
}