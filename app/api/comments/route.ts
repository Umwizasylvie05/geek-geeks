import { NextRequest, NextResponse } from "next/server";
import type { Comment } from "@/lib/types";
import { getCommentsForArticle } from "@/lib/seed/comments";

export const dynamic = "force-dynamic";

// Runtime-stored comments (demo only; not persisted across restarts).
const runtimeComments = new Map<string, Comment[]>();

export async function GET(request: NextRequest) {
  const articleId = request.nextUrl.searchParams.get("articleId");
  if (!articleId) return NextResponse.json([], { status: 400 });
  const seeded = getCommentsForArticle(articleId);
  const merged = [...(runtimeComments.get(articleId) ?? []), ...seeded].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(merged);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.body !== "string" || !body.articleId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const trimmed = body.body.trim();
  if (trimmed.length < 2 || trimmed.length > 2000) {
    return NextResponse.json({ error: "Invalid length" }, { status: 400 });
  }
  const comment: Comment = {
    id: `rt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    articleId: body.articleId,
    parentId: body.parentId ?? null,
    author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "Guest",
    body: trimmed,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: [],
  };
  const list = runtimeComments.get(comment.articleId) ?? [];
  list.unshift(comment);
  runtimeComments.set(comment.articleId, list);
  return NextResponse.json(comment, { status: 201 });
}