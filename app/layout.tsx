import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME } from "@/lib/utils";
import { NAV_MEGA_LINKS, CATEGORY_TREE, TUTORIAL_LINKS } from "@/lib/seed/categories";
import { courseCategories, getCourses } from "@/lib/repo";
import { Navbar, type MegaSection, type NavLinkItem } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Learn Coding, Practice Problems, Explore Tutorials`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "GeeksforGeeks is a learning platform for programming tutorials, data structures and algorithms, practice problems, and courses.",
  keywords: [
    "programming",
    "data structures",
    "algorithms",
    "tutorials",
    "practice problems",
    "coding",
  ],
};

function buildLinks(): NavLinkItem[] {
  const all: NavLinkItem[] = NAV_MEGA_LINKS.map((l) => ({
    label: l.label,
    href: l.href,
    key: l.key,
    special: l.isCourses
      ? "courses"
      : l.isPractice
        ? "practice"
        : undefined,
  }));
  const byKey = (key: string) => all.find((l) => l.key === key)!;
  return [
    byKey("courses"),
    { label: "Tutorials", href: "/category/dsa", key: "tutorials" },
    byKey("interview-prep"),
    byKey("dsa"),
    byKey("languages"),
    byKey("web-dev"),
    byKey("system-design"),
    byKey("cs-fundamentals"),
    byKey("practice"),
  ];
}

function buildMegaMenus(): Record<string, MegaSection[]> {
  const menus: Record<string, MegaSection[]> = {};

  for (const cat of CATEGORY_TREE) {
    menus[cat.slug] = cat.children.slice(0, 6).map((child) => ({
      title: child.name,
      titleHref: `/category/${child.id}`,
      items: child.children.slice(0, 6).map((gc) => ({
        label: gc.name,
        href: `/category/${gc.id}`,
      })),
    }));
  }

  menus["tutorials"] = CATEGORY_TREE.filter(
    (c) => c.slug !== "interview-prep"
  )
    .slice(0, 5)
    .map((root) => ({
      title: root.name,
      titleHref: `/category/${root.id}`,
      items: root.children.slice(0, 6).map((child) => ({
        label: child.name,
        href: `/category/${child.id}`,
      })),
    }));

  menus["courses"] = [
    ...courseCategories().map((cc) => ({
      title: cc.name,
      titleHref: `/courses?category=${cc.slug}`,
      items: [] as { label: string; href: string }[],
    })),
    {
      title: "Featured",
      titleHref: "/courses",
      items: getCourses()
        .slice(0, 4)
        .map((c) => ({ label: c.title, href: `/courses/${c.slug}` })),
    },
  ];

  menus["practice"] = [
    {
      title: "By difficulty",
      titleHref: "/practice",
      items: [
        { label: "Easy problems", href: "/practice?difficulty=Easy" },
        { label: "Medium problems", href: "/practice?difficulty=Medium" },
        { label: "Hard problems", href: "/practice?difficulty=Hard" },
      ],
    },
    {
      title: "Topics",
      titleHref: "/practice",
      items: [
        { label: "Arrays", href: "/practice?tags=Array" },
        { label: "Strings", href: "/practice?tags=Strings" },
        { label: "Dynamic Programming", href: "/practice?tags=Dynamic%20Programming" },
        { label: "Linked List", href: "/practice?tags=Linked%20List" },
      ],
    },
  ];

  return menus;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <QueryProvider>
          <Navbar
            links={buildLinks()}
            megaMenus={buildMegaMenus()}
            secondaryLinks={TUTORIAL_LINKS}
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}