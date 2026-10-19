"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";
import { cn, SITE_NAME } from "@/lib/utils";
import { SearchAutocomplete } from "./search-autocomplete";
import { MobileNav } from "./mobile-nav";

export interface MegaSection {
  title: string;
  titleHref: string;
  items: { label: string; href: string }[];
}

export interface NavLinkItem {
  label: string;
  href: string;
  key: string;
  special?: "courses" | "practice";
}

const TOP_ROW_KEYS = ["courses", "tutorials", "interview-prep"];

export function Navbar({
  links,
  megaMenus,
  secondaryLinks,
}: {
  links: NavLinkItem[];
  megaMenus: Record<string, MegaSection[]>;
  secondaryLinks: { label: string; href: string }[];
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const close = () => setOpenKey(null);

  const topRowLinks = links.filter((l) => TOP_ROW_KEYS.includes(l.key));

  return (
    <header className="sticky top-0 z-40 border-b border-header-line bg-nav">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="lg:hidden -ml-1 rounded-lg p-2 text-muted hover:bg-surface-2"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="GeeksforGeeks home">
            <span className="hidden text-lg font-extrabold tracking-tight text-foreground sm:inline">
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden items-center md:flex">
            <SearchAutocomplete className="w-auto" />
          </div>

          <button
            className="md:hidden -mr-1 rounded-lg p-2 text-muted hover:bg-surface-2"
            aria-label="Search"
            onClick={() => setMobileSearch(true)}
          >
            <Search className="size-5" />
          </button>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {topRowLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            const hasMenu = !!megaMenus[link.key];
            return (
              <div
                key={link.key}
                className="relative"
                onMouseEnter={() => hasMenu && setOpenKey(link.key)}
                onMouseLeave={close}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted hover:bg-surface-2 hover:text-foreground"
                  )}
                >
                  {link.label}
                  {hasMenu ? (
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        openKey === link.key && "rotate-180"
                      )}
                    />
                  ) : null}
                </Link>
                {hasMenu && openKey === link.key ? (
                  <MegaMenuPanel
                    sections={megaMenus[link.key]}
                    onClose={close}
                  />
                ) : null}
              </div>
            );
          })}
        </nav>

<div className="flex shrink-0 items-center gap-1">
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <nav
          className="border-t border-header-line md:block"
          aria-label="Secondary"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 px-4 py-1">
            {secondaryLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted hover:bg-surface-2 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

      {/* Mobile search overlay */}
      {mobileSearch ? (
        <div className="border-t border-header-line px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <SearchAutocomplete
              className="flex-1"
              onNavigate={() => setMobileSearch(false)}
            />
            <button
              className="shrink-0 text-sm font-medium text-faint hover:text-foreground"
              onClick={() => setMobileSearch(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
        megaMenus={megaMenus}
        pathname={pathname}
        router={router}
      />
    </header>
  );
}

function MegaMenuPanel({
  sections,
  onClose,
}: {
  sections: MegaSection[];
  onClose: () => void;
}) {
  return (
    <div className="fade-in absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 rounded-xl border border-line bg-surface p-5 shadow-xl">
      <div className="grid grid-cols-3 gap-6">
        {sections.map((s) => (
          <div key={s.title}>
            <Link
              href={s.titleHref}
              onClick={onClose}
              className="mb-2 inline-block text-sm font-bold text-foreground hover:text-link"
            >
              {s.title}
            </Link>
            {s.items.length ? (
              <ul className="space-y-1">
                {s.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-[13px] text-muted transition-colors hover:text-link hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-line pt-3 text-xs text-faint">
        Explore everything under this topic in the full category page.
      </div>
    </div>
  );
}