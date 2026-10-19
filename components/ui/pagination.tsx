"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  pageCount,
  basePath,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  basePath?: string;
  onPageChange?: (p: number) => void;
}) {
  const router = useRouter();
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const visible = pages.filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1
  );

  const items: (number | "...")[] = [];
  let prev = 0;
  for (const p of visible) {
    if (p - prev > 1) items.push("...");
    items.push(p);
    prev = p;
  }

  const go = (p: number) => {
    if (basePath) {
      const sp = new URLSearchParams(window.location.search);
      sp.set("page", String(p));
      const qs = sp.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath);
    } else {
      onPageChange?.(p);
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-1.5"
    >
      <button
        onClick={() => page > 1 && go(page - 1)}
        disabled={page <= 1}
        className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      {items.map((it, i) =>
        it === "..." ? (
          <span key={`e${i}`} className="px-1.5 text-faint">
            …
          </span>
        ) : (
          <button
            key={it}
            onClick={() => go(it)}
            aria-current={it === page ? "page" : undefined}
            className={cn(
              "min-w-9 rounded-lg border px-2 py-1.5 text-sm transition-colors",
              it === page
                ? "border-primary bg-primary font-semibold text-on-primary"
                : "border-line text-muted hover:bg-surface-2"
            )}
          >
            {it}
          </button>
        )
      )}
      <button
        onClick={() => page < pageCount && go(page + 1)}
        disabled={page >= pageCount}
        className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}