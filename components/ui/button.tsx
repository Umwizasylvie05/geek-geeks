"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variant === "primary" && "bg-primary text-on-primary hover:bg-primary-hover",
        variant === "outline" &&
          "border border-line bg-transparent text-foreground hover:bg-surface-2",
        variant === "secondary" && "bg-surface-2 text-foreground hover:bg-surface-3",
        variant === "ghost" && "text-muted hover:bg-surface-2 hover:text-foreground",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-5 py-2.5 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  icon: Icon,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: LucideIcon;
  target?: string;
}) {
  const Ico = Icon ?? ArrowRight;
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
        variant === "primary" &&
          "bg-primary text-on-primary hover:bg-primary-hover",
        variant === "outline" &&
          "border border-line bg-transparent text-foreground hover:bg-surface-2",
        variant === "secondary" && "bg-surface-2 text-foreground hover:bg-surface-3",
        variant === "ghost" && "text-muted hover:bg-surface-2 hover:text-foreground",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-5 py-2.5 text-sm",
        className
      )}
    >
      {children}
      {Ico ? <Ico className="size-4" /> : null}
    </Link>
  );
}