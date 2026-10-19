"use client";

import { ReactNode } from "react";
import { useUIStore } from "@/lib/store/ui-store";

export function CategoryLayout({
  sidebar,
  children,
  rail,
}: {
  sidebar: ReactNode;
  children: ReactNode;
  rail?: ReactNode;
}) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  return (
    <div
      className={
        collapsed
          ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
          : "grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)_300px]"
      }
    >
      {sidebar}
      <div className="min-w-0">{children}</div>
      {rail ? (
        <aside className="hidden lg:block">{rail}</aside>
      ) : null}
    </div>
  );
}