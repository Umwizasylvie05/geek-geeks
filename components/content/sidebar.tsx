"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SidebarItem } from "@/lib/seed/categories";
import { useUIStore } from "@/lib/store/ui-store";

function Tree({
  items,
  level = 0,
  pathname,
  activeSlug,
  defaultOpen,
}: {
  items: SidebarItem[];
  level?: number;
  pathname: string;
  activeSlug?: string;
  defaultOpen?: string | null;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    if (!defaultOpen) return {};
    const entry: Record<string, boolean> = { [defaultOpen]: true };
    return entry;
  });

  return (
    <ul className={cn(level > 0 && "ml-3 border-l border-line pl-2")}>
      {items.map((item) => {
        const active = pathname === item.href || item.id === activeSlug;
        const hasChildren = item.children.length > 0;
        const expanded = open[item.id] ?? (item.children.some((c) => c.id === activeSlug) || active);
        const toggle = () =>
          setOpen((o) => ({ ...o, [item.id]: !o[item.id] }));
        return (
          <li key={item.id}>
            <div className="group flex items-center">
              <button
                onClick={toggle}
                aria-label={expanded ? "Collapse" : "Expand"}
                aria-expanded={expanded}
                className={cn(
                  "mr-1 rounded p-0.5 text-faint hover:text-foreground",
                  !hasChildren && "invisible"
                )}
              >
                {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
              </button>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-1 items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-primary-soft font-medium text-primary"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                )}
              >
                <span className="truncate">{item.label}</span>
                {item.count > 0 ? (
                  <span className="ml-2 shrink-0 text-[11px] text-faint">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            </div>
            {hasChildren && expanded ? (
              <Tree
                items={item.children}
                level={level + 1}
                pathname={pathname}
                activeSlug={activeSlug}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function CategorySidebar({
  items,
  title,
  activeSlug,
  mobile,
  onClose,
}: {
  items: SidebarItem[];
  title: string;
  activeSlug?: string;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const [tree, setTree] = useState<SidebarItem[]>(items);
  const [prevItems, setPrevItems] = useState(items);
  if (prevItems !== items) {
    setPrevItems(items);
    setTree(items);
  }

  if (mobile) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-bold text-foreground">{title} topics</h2>
          <button
            onClick={onClose}
            aria-label="Close topics drawer"
            className="rounded-lg p-1.5 text-faint hover:bg-surface-2 hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <Tree
            items={tree}
            pathname={pathname}
            activeSlug={activeSlug}
            defaultOpen={activeSlug}
          />
        </div>
      </div>
    );
  }

  if (collapsed) return null;

  return (
    <aside className="hidden lg:block" aria-label="Category topics">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-line bg-surface p-3">
        <h2 className="px-2 pb-2 text-sm font-bold text-foreground">{title}</h2>
        <Tree
          items={tree}
          pathname={pathname}
          activeSlug={activeSlug}
          defaultOpen={activeSlug}
        />
      </div>
    </aside>
  );
}

export function SidebarToggleButton() {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggle = useUIStore((s) => s.toggleSidebar);
  return (
    <button
      onClick={toggle}
      aria-label="Toggle sidebar"
      aria-pressed={!sidebarCollapsed}
      className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2"
    >
      {sidebarCollapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
      {sidebarCollapsed ? "Show" : "Hide"} topics
    </button>
  );
}