import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ACTIONS = ["like", "dislike", "neutral", "bookmark", "unbookmark"] as const;

export async function POST(
  request: Request,
  { params }: RouteContext<"/api/articles/[slug]/interactions">
) {
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const action = body?.action;
  if (!ACTIONS.includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
  return NextResponse.json({ slug, action, ok: true });
}