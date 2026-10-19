import Image from "next/image";
import Link from "next/link";
import { Star, Users } from "lucide-react";

interface CoursePromo {
  title: string;
  rating: string;
  level: string;
  interested: string;
}

const COURSES: CoursePromo[] = [
  {
    title: "DSA & System Design Course - SDE Interview Prep",
    rating: "4.9",
    level: "Beginner to Advanced",
    interested: "446k+",
  },
  {
    title: "AI Engineering Course - Generative AI & Agentic AI",
    rating: "4.7",
    level: "Beginner to Advanced",
    interested: "90k+",
  },
  {
    title: "DevOps & Cloud Course - AWS, Docker, Kubernetes with AI",
    rating: "4.7",
    level: "Beginner to Advanced",
    interested: "182k+",
  },
  {
    title: "Java Backend Course - Spring Boot, Microservices with AI",
    rating: "4.6",
    level: "Intermediate and Advanced",
    interested: "429k+",
  },
  {
    title: "MERN Full Stack Course - React, Node & MongoDB with AI",
    rating: "4.7",
    level: "Beginner to Advanced",
    interested: "451k+",
  },
  {
    title: "System Design Course - HLD, Scalability & Distributed Systems",
    rating: "4.9",
    level: "Beginner to Advanced",
    interested: "49k+",
  },
];

export function CoursePromoGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {COURSES.map((c) => (
        <article
          key={c.title}
          className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
        >
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <span className="flex items-center gap-1 text-sm font-bold text-foreground">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {c.rating}
            </span>
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-faint">
              Course
            </span>
          </div>

          <Link
            href="/courses"
            className="relative block aspect-[16/9] overflow-hidden bg-surface-2"
          >
            <Image
              src={`https://picsum.photos/seed/${encodeURIComponent(c.title)}/480/270`}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="flex flex-1 flex-col gap-2 px-4 py-6">
            <h3 className="line-clamp-2 font-semibold leading-snug text-foreground">
              <Link href="/courses" className="transition-colors group-hover:text-link">
                {c.title}
              </Link>
            </h3>
            <p className="text-xs font-medium text-muted">{c.level}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-1">
              <p className="flex items-center gap-1.5 text-xs text-faint">
                <Users className="size-3.5" />
                {c.interested} interested Geeks
              </p>
              <Link
                href="/courses"
                className="shrink-0 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
              >
                Explore now
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}