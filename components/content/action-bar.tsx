"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  Flag,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

type Kind = "article" | "problem";
type Vote = "up" | "down" | null;

export function ActionBar({
  targetType,
  targetSlug,
  likes = 0,
  dislikes = 0,
  variant = "row",
}: {
  targetType: Kind;
  targetSlug: string;
  likes?: number;
  dislikes?: number;
  variant?: "row" | "pills";
}) {
  const [vote, setVote] = useState<Vote>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [shared, setShared] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const key = `cn_${targetType}_${targetSlug}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.vote) setVote(s.vote);
        if (s.bookmarked) setBookmarked(true);
      }
    } catch {
      /* ignore */
    }
  }, [targetType, targetSlug]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const persist = (s: { vote?: Vote; bookmarked?: boolean }) => {
    const key = `cn_${targetType}_${targetSlug}`;
    try {
      const prev = localStorage.getItem(key);
      localStorage.setItem(
        key,
        JSON.stringify({ ...(prev ? JSON.parse(prev) : {}), ...s })
      );
    } catch {
      /* ignore */
    }
  };

  const toggleVote = (v: "up" | "down") => {
    setVote((cur) => {
      const next: Vote = cur === v ? null : v;
      setLikeCount((n) =>
        n + (next === "up" ? 1 : cur === "up" ? -1 : 0)
      );
      setDislikeCount((n) =>
        n + (next === "down" ? 1 : cur === "down" ? -1 : 0)
      );
      persist({ vote: next });
      fetch(`/api/${targetType}s/${targetSlug}/interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: next === "up" ? "like" : next === "down" ? "dislike" : "neutral" }),
      }).catch(() => {});
      return next;
    });
  };

  const toggleBookmark = () => {
    setBookmarked((b) => {
      persist({ bookmarked: !b });
      fetch(`/api/${targetType}s/${targetSlug}/interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: !b ? "bookmark" : "unbookmark" }),
      }).catch(() => {});
      return !b;
    });
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      /* cancelled */
    }
  };

  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors";
  const iconBtn = "rounded-lg p-2 text-faint transition-colors hover:bg-surface-2 hover:text-foreground";

  if (variant === "pills") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => toggleVote("up")}
          aria-pressed={vote === "up"}
          className={cn(
            base,
            "border border-line",
            vote === "up" ? "border-primary bg-primary-soft text-primary" : "text-muted hover:bg-surface-2"
          )}
        >
          <ThumbsUp className="size-4" /> {formatNumber(likeCount)}
        </button>
        <button
          onClick={() => toggleVote("down")}
          aria-pressed={vote === "down"}
          className={cn(
            base,
            "border border-line",
            vote === "down" ? "border-hard bg-hard-soft text-hard" : "text-muted hover:bg-surface-2"
          )}
        >
          <ThumbsDown className="size-4" /> {formatNumber(dislikeCount)}
        </button>
        <button onClick={toggleBookmark} className={cn(base, "border border-line text-muted hover:bg-surface-2", bookmarked && "border-primary text-primary")}>
          {bookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
        <button onClick={share} className={cn(base, "border border-line text-muted hover:bg-surface-2")}>
          <Share2 className="size-4" /> {shared ? "Copied!" : "Share"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-y border-line py-2">
      <button
        onClick={() => toggleVote("up")}
        aria-pressed={vote === "up"}
        className={cn(iconBtn, "flex items-center gap-1.5 pr-3", vote === "up" && "text-primary")}
      >
        <ThumbsUp className="size-4.5" />
        <span className="text-sm">{formatNumber(likeCount)}</span>
      </button>
      <button
        onClick={() => toggleVote("down")}
        aria-pressed={vote === "down"}
        className={cn(iconBtn, "flex items-center gap-1.5 pr-3", vote === "down" && "text-hard")}
      >
        <ThumbsDown className="size-4.5" />
        <span className="text-sm">{formatNumber(dislikeCount)}</span>
      </button>
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <button onClick={toggleBookmark} title="Bookmark" className={cn(iconBtn, bookmarked && "text-primary")}>
        {bookmarked ? <BookmarkCheck className="size-4.5" /> : <Bookmark className="size-4.5" />}
      </button>
      <button onClick={share} title="Share" className={cn(iconBtn, shared && "text-primary")}>
        <Share2 className="size-4.5" />
      </button>
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <Link href="/contact" className={cn(iconBtn, "flex items-center gap-1.5")}>
        <Flag className="size-4" />
        <span className="text-xs">Report issue</span>
      </Link>
    </div>
  );
}