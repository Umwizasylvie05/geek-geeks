import { Skeleton } from "@/components/ui/section";

export default function Loading() {
  return (
    <div className="mx-auto max-w-container space-y-8 px-4 py-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-9 w-80 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-line bg-surface p-4">
            <Skeleton className="aspect-[16/9] w-full" />
            <Skeleton className="mt-3 h-4 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}