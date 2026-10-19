import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-3 text-xl font-bold text-foreground">
        This page has flown the nest
      </h1>
      <p className="mt-2 max-w-md text-sm text-faint">
        The tutorial, problem, or page you are looking for does not exist or has
        moved. Try searching, or head back home.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
        >
          <Home className="size-4" /> Go home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface-2"
        >
          <Search className="size-4" /> Search
        </Link>
      </div>
    </div>
  );
}