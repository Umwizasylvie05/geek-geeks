import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Sparkles } from "lucide-react";
import { getCourses, courseCategories } from "@/lib/repo";
import { CourseCard } from "@/components/courses/course-card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Guided, structured courses across DSA, web development, system design, and more.",
};

export default async function CoursesPage({
  searchParams,
}: PageProps<"/courses">) {
  const sp = await searchParams;
  const active = typeof sp.category === "string" ? sp.category : "All";
  const courses = getCourses({ category: active });
  const categories = courseCategories();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <header className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
          <GraduationCap className="size-7 text-primary" />
          Trending Courses
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-faint">
          Structured paths with video-style lessons, quizzes, and hands-on
          projects — taught by working engineers. Free courses are marked.
        </p>
      </header>

      <nav aria-label="Course categories" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4">
        {[{ name: "All", slug: "All" }, ...categories].map((c) => (
          <Link
            key={c.slug}
            href={c.slug === "All" ? "/courses" : `/courses?category=${c.slug}`}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === c.slug
                ? "border-primary bg-primary text-on-primary"
                : "border-line bg-surface text-muted hover:bg-surface-2"
            )}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      {courses.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line py-20 text-center">
          <Sparkles className="mx-auto size-8 text-primary" />
          <p className="mt-3 font-semibold text-foreground">No courses here yet</p>
          <p className="mt-1 text-sm text-faint">
            We are busy recording. Check another category.
          </p>
        </div>
      )}
    </div>
  );
}