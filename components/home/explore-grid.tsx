import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreCard {
  label: string;
  href: string;
  bg: string;
  hoverText: string;
}

const CARDS: ExploreCard[] = [
  { label: "Data Structure and Algorithms", href: "/category/dsa", bg: "bg-violet-600", hoverText: "group-hover:text-violet-700" },
  { label: "Web Development", href: "/category/web-dev", bg: "bg-blue-600", hoverText: "group-hover:text-blue-700" },
  { label: "AI ML & Data Science", href: "/courses", bg: "bg-fuchsia-600", hoverText: "group-hover:text-fuchsia-700" },
  { label: "Machine Learning", href: "/courses", bg: "bg-cyan-600", hoverText: "group-hover:text-cyan-700" },
  { label: "Python", href: "/category/python", bg: "bg-emerald-600", hoverText: "group-hover:text-emerald-700" },
  { label: "Java", href: "/category/java", bg: "bg-orange-600", hoverText: "group-hover:text-orange-700" },
  { label: "System Design", href: "/category/system-design", bg: "bg-indigo-600", hoverText: "group-hover:text-indigo-700" },
  { label: "DevOps", href: "/courses", bg: "bg-sky-600", hoverText: "group-hover:text-sky-700" },
  { label: "Programming Languages", href: "/category/languages", bg: "bg-teal-600", hoverText: "group-hover:text-teal-700" },
  { label: "CS Subjects", href: "/category/cs-fundamentals", bg: "bg-amber-600", hoverText: "group-hover:text-amber-700" },
  { label: "Practice DSA", href: "/practice", bg: "bg-rose-600", hoverText: "group-hover:text-rose-700" },
  { label: "Interview Preparation", href: "/category/interview-prep", bg: "bg-purple-600", hoverText: "group-hover:text-purple-700" },
  { label: "Databases", href: "/category/databases", bg: "bg-lime-600", hoverText: "group-hover:text-lime-700" },
  { label: "Software & Tools", href: "/category/system-design", bg: "bg-slate-600", hoverText: "group-hover:text-slate-700" },
];

export function ExploreGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {CARDS.map((card) => (
        <Link
          key={card.label}
          href={card.href}
          className={cn(
            "group flex min-h-36 flex-col items-center justify-center gap-4 rounded-2xl px-6 py-8 text-center transition-transform hover:-translate-y-0.5",
            card.bg
          )}
        >
          <h3 className="text-lg font-bold text-white">{card.label}</h3>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-white bg-transparent px-4 py-1.5 text-sm font-semibold text-white transition-colors group-hover:bg-white",
              card.hoverText
            )}
          >
            View more
            <ChevronRight className="size-4" />
          </span>
        </Link>
      ))}
    </div>
  );
}