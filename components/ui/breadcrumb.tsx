import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1 text-sm text-faint"
    >
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-link"
      >
        <Home className="size-3.5" />
        <span>Home</span>
      </Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="size-3.5 text-faint/70" />
          {c.href ? (
            <Link
              href={c.href}
              className="transition-colors hover:text-link hover:underline"
            >
              {c.label}
            </Link>
          ) : (
            <span className="max-w-[220px] truncate text-foreground">
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}