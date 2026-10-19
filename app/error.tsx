"use client";

import { useEffect } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-hard-soft text-hard">
        <TriangleAlert className="size-7" />
      </span>
      <h1 className="mt-4 text-xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-sm text-faint">
        An unexpected error occurred while rendering this page. Try again, or
        head home.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
        >
          <RefreshCw className="size-4" /> Try again
        </button>
      </div>
    </div>
  );
}