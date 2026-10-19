import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  link,
  className,
}: {
  title: string;
  subtitle?: string;
  link?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-faint">{subtitle}</p> : null}
      </div>
      {link ? (
        <Link
          href={link.href}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-link hover:underline"
        >
          {link.label}
          <ChevronRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface-3",
        className
      )}
    />
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line py-16 text-center">
      <div className="mb-3 text-4xl">🗂️</div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-faint">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}