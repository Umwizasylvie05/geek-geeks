import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Clock, GraduationCap, Users } from "lucide-react";
import { getCourseBySlug, relatedCourses } from "@/lib/repo";
import { ModuleList } from "@/components/courses/module-list";
import { CourseCard } from "@/components/courses/course-card";
import { CourseRating } from "@/components/ui/rating";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Avatar } from "@/components/ui/avatar";
import { formatNumber, humanizeDuration } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.tagline,
  };
}

export default async function CourseDetailPage({
  params,
}: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const related = relatedCourses(course.category, 3);
  const free = course.price === null || course.price === 0;
  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <Breadcrumb
        crumbs={[
          { label: "Courses", href: "/courses" },
          { label: course.category, href: `/courses?category=${course.category.toLowerCase().replace(/\s+/g, "-")}` },
          { label: course.title },
        ]}
      />

      {/* Hero */}
      <header className="mt-4 grid gap-6 rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-2 p-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 font-semibold text-primary">
              {course.category}
            </span>
            <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-faint">
              {course.level}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
            {course.title}
          </h1>
          <p className="mt-2 max-w-2xl text-muted">{course.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-faint">
            <CourseRating rating={course.rating} count={course.reviewCount} />
            <span className="flex items-center gap-1.5">
              <Users className="size-4" /> {formatNumber(course.enrolled)} enrolled
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {humanizeDuration(course.durationHours * 60)}
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-4" /> {totalLessons} lessons
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Avatar name={course.instructor} size="lg" />
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                {course.instructor}
                <BadgeCheck className="size-4 text-primary" />
              </p>
              <p className="text-xs text-faint">{course.instructorTitle}</p>
            </div>
          </div>
        </div>

        <div className="self-center">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface-2">
            <Image
              src={`https://picsum.photos/seed/${course.thumbnailSeed}/640/360`}
              alt={course.title}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-2xl font-extrabold text-foreground">
              {free ? (
                <span className="text-primary">Free</span>
              ) : (
                <>
                  <span className="mr-2 text-sm font-normal text-faint line-through">
                    ${Math.round((course.price ?? 0) * 1.4)}
                  </span>
                  ${course.price}
                </>
              )}
            </p>
            <a
              href="#curriculum"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
            >
              Enroll now
            </a>
            <Link
              href="/practice"
              className="text-center text-xs text-faint transition-colors hover:text-link"
            >
              30-day money-back guarantee
            </Link>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-foreground">Description</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {course.description}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground">
              What you will learn
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {course.learningOutcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-muted"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-easy/15 text-easy">
                    ✓
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section id="curriculum" className="scroll-mt-24">
            <h2 className="mb-3 text-lg font-bold text-foreground">Curriculum</h2>
            <ModuleList modules={course.modules} />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              Student reviews
            </h2>
            <div className="space-y-3">
              {course.reviews.map((r) => (
                <div
                  key={r.author + r.text}
                  className="rounded-xl border border-line bg-surface p-4"
                >
                  <div className="flex items-center gap-2">
                    <Avatar name={r.author} size="sm" />
                    <span className="text-sm font-semibold text-foreground">
                      {r.author}
                    </span>
                    <CourseRating rating={r.rating} count={0} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start lg:pb-8">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              About the instructor
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <Avatar name={course.instructor} size="lg" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {course.instructor}
                </p>
                <p className="text-xs text-faint">{course.instructorTitle}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-faint">
              {course.instructor} has spent years shipping production software
              and now teaches the fundamentals that every engineer needs to
              internalize.
            </p>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length ? (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-foreground">
            More {course.category} courses
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}