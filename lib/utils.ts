import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Difficulty } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_NAME = "GeeksforGeeks";

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { badge: string; dot: string }
> = {
  Easy: {
    badge: "bg-easy-soft text-easy",
    dot: "bg-easy",
  },
  Medium: {
    badge: "bg-medium-soft text-medium",
    dot: "bg-medium",
  },
  Hard: {
    badge: "bg-hard-soft text-hard",
    dot: "bg-hard",
  },
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} yr${years > 1 ? "s" : ""} ago`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export function formatRating(n: number): string {
  return n.toFixed(1);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function thumb(slug: string, w = 400, h = 250): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/${w}/${h}`;
}

export function humanizeDuration(min: number): string {
  if (min < 60) return `${min} min read`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min read` : `${h} hr read`;
}

export function clampAcceptance(n: number): number {
  return Math.min(100, Math.max(0, n));
}