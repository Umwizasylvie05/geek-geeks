"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { CategorySidebar } from "./sidebar";
import type { SidebarItem } from "@/lib/seed/categories";

export function MobileTopicsButton({
  items,
  title,
}: {
  items: SidebarItem[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 lg:hidden"
      >
        <Menu className="size-4" />
        Topics
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close topics drawer"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-background shadow-xl">
            <CategorySidebar
              items={items}
              title={title}
              mobile
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}