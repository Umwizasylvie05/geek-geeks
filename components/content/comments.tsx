"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, MessageSquare, Send, ThumbsUp } from "lucide-react";
import type { Comment } from "@/lib/types";
import { timeAgo, cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/section";

async function fetchComments(articleId: string): Promise<Comment[]> {
  const res = await fetch(`/api/comments?articleId=${articleId}`);
  if (!res.ok) throw new Error("Failed to load comments");
  return res.json();
}

async function postComment(payload: {
  articleId: string;
  author: string;
  body: string;
  parentId?: string | null;
}): Promise<Comment> {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
}

function CommentRow({
  comment,
  articleId,
  depth = 0,
}: {
  comment: Comment;
  articleId: string;
  depth?: number;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", articleId] });
      setReplyText("");
      setReplyOpen(false);
    },
  });

  return (
    <div className={cn(depth > 0 && "ml-6 md:ml-10")}>
      <div className="mt-4 flex gap-3">
        <Avatar name={comment.author} size={depth > 0 ? "sm" : "md"} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-semibold text-foreground">
              {comment.author}
            </span>
            {comment.author === "GeeksforGeeks Team" ? (
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
                Official
              </span>
            ) : null}
            <span className="text-xs text-faint">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{comment.body}</p>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-faint">
            <span className="flex items-center gap-1">
              <ThumbsUp className="size-3.5" /> {comment.likes}
            </span>
            <button
              onClick={() => setReplyOpen((o) => !o)}
              className="flex items-center gap-1 font-medium text-muted transition-colors hover:text-link"
            >
              {replyOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
              Reply
            </button>
          </div>
          {replyOpen ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!replyText.trim()) return;
                mutation.mutate({
                  articleId,
                  author: "You",
                  body: replyText.trim(),
                  parentId: comment.id,
                });
              }}
              className="mt-2 flex gap-2"
            >
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply…"
                className="w-full rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" size="sm" disabled={!replyText.trim() || mutation.isPending}>
                <Send className="size-3.5" />
              </Button>
            </form>
          ) : null}
        </div>
      </div>
      {comment.replies.map((r) => (
        <CommentRow key={r.id} comment={r} articleId={articleId} depth={depth + 1} />
      ))}
    </div>
  );
}

export function CommentSection({
  articleId,
  count,
}: {
  articleId: string;
  count: number;
}) {
  const [body, setBody] = useState("");
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", articleId],
    queryFn: () => fetchComments(articleId),
  });

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", articleId] });
      setBody("");
    },
  });

  return (
    <section id="comments" className="mt-10 scroll-mt-24" aria-label="Comments">
      <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
        <MessageSquare className="size-5 text-primary" />
        {count} Comments
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!body.trim()) return;
          mutation.mutate({
            articleId,
            author: "You",
            body: body.trim(),
            parentId: null,
          });
        }}
        className="mt-4 flex gap-3"
      >
        <Avatar name="You" />
        <div className="flex-1">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={2}
            placeholder="Share your thoughts or ask a question…"
            className="w-full resize-y rounded-lg border border-line bg-surface px-3 py-2 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="mt-2 flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={!body.trim() || mutation.isPending}
            >
              Post comment
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-sm text-faint">Comments could not be loaded.</p>
        ) : data && data.length > 0 ? (
          data.map((c) => <CommentRow key={c.id} comment={c} articleId={articleId} />)
        ) : (
          <p className="text-sm text-faint">No comments yet. Be the first!</p>
        )}
      </div>
    </section>
  );
}