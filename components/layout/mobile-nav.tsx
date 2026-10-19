"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChefHat, ChevronRight, Code2, X } from "lucide-react";
import { cn, SITE_NAME } from "@/lib/utils";
import type { NavLinkItem, MegaSection } from "./navbar";

export function MobileNav({
  open,
  onClose,
  links,
  megaMenus,
  pathname,
  router,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLinkItem[];
  megaMenus: Record<string, MegaSection[]>;
  pathname: string;
  router: { push: (href: string) => void };
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="flex items-center gap-2 text-lg font-extrabold text-foreground">
            {SITE_NAME}
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-faint hover:bg-surface-2 hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-3 grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={onClose}
              className="rounded-lg border border-line py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              className="rounded-lg bg-primary py-2 text-center text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
            >
              Sign Up
            </Link>
          </div>

          <ul className="divide-y divide-line">
            {links.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              const menu = megaMenus[link.key];
              const isExpanded = expanded === link.key;
              return (
                <li key={link.key}>
                  <div
                    className={cn(
                      "flex items-center justify-between py-3 text-left",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    <button
                      onClick={() =>
                        menu ? setExpanded(isExpanded ? null : link.key) : go(link.href)
                      }
                      className={cn(
                        "flex flex-1 items-center gap-2 text-sm font-semibold",
                        isActive ? "text-primary" : "text-foreground"
                      )}
                    >
                      {link.special ? (
                        <Code2 className="size-4 text-primary" />
                      ) : (
                        <ChefHat className="size-4 text-faint" />
                      )}
                      {link.label}
                    </button>
                    {menu ? (
                      <button
                        onClick={() => setExpanded(isExpanded ? null : link.key)}
                        aria-label={`Expand ${link.label}`}
                        className="p-1 text-faint"
                      >
                        <ChevronRight
                          className={cn(
                            "size-4 transition-transform",
                            isExpanded && "rotate-90"
                          )}
                        />
                      </button>
                    ) : null}
                  </div>
                  {menu && isExpanded ? (
                    <ul className="space-y-2 border-l border-line pl-4 pb-3">
                      {menu.map((s) => (
                        <li key={s.title}>
                          <Link
                            href={s.titleHref}
                            onClick={onClose}
                            className="text-sm font-medium text-muted hover:text-link"
                          >
                            {s.title}
                          </Link>
                          {s.items.length ? (
                            <ul className="mt-1 space-y-1.5">
                              {s.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="text-[13px] text-faint hover:text-link"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-line p-4 text-xs text-faint">
          Built as an original learning platform demo. All content is placeholder.
        </div>
      </div>
    </div>
  );
}