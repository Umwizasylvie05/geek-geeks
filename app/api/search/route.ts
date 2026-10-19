import { NextRequest, NextResponse } from "next/server";
import { searchAll } from "@/lib/repo";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const results = searchAll(q);
  return NextResponse.json({
    articles: results.articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      categoryName: a.categoryName,
      tags: a.tags,
    })),
    problems: results.problems.map((p) => ({
      slug: p.slug,
      title: p.title,
      difficulty: p.difficulty,
      tags: p.tags,
    })),
    courses: results.courses.map((c) => ({
      slug: c.slug,
      title: c.title,
      category: c.category,
      rating: c.rating,
    })),
  });
}