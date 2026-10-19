import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Users } from "lucide-react";
import { getProblemBySlug, relatedCourses } from "@/lib/repo";
import { ProblemSolver } from "@/components/practice/problem-solver";
import { DifficultyBadge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Callout } from "@/components/ui/callout";
import { CourseCard } from "@/components/courses/course-card";
import { formatNumber } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/practice/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return {};
  return {
    title: `${problem.title} — Practice`,
    description: problem.description.slice(0, 160),
  };
}

export default async function ProblemPage({
  params,
}: PageProps<"/practice/[slug]">) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) notFound();

  const courses = relatedCourses("Data Structures & Algorithms", 3);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-6">
      <header className="mb-5">
        <Breadcrumb
          crumbs={[
            { label: "Practice", href: "/practice" },
            { label: problem.title },
          ]}
        />
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Problem statement */}
        <div className="min-w-0 rounded-xl border border-line bg-surface px-5 py-6 sm:px-7">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={problem.difficulty} />
            {problem.tags.map((t) => (
              <Link
                key={t}
                href={`/practice?tags=${encodeURIComponent(t)}`}
                className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted transition-colors hover:bg-primary-soft hover:text-primary"
              >
                {t}
              </Link>
            ))}
          </div>

          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-foreground">
            {problem.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-faint">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-easy" />
              {problem.acceptanceRate}% acceptance
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4" />
              {formatNumber(problem.submissions)} submissions
            </span>
            {problem.companies.length ? (
              <span className="text-xs">
                Asked by: {problem.companies.slice(0, 3).join(", ")}
              </span>
            ) : null}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            {problem.description}
          </p>

          <h2 className="mt-6 text-lg font-bold text-foreground">Examples</h2>
          <div className="mt-3 space-y-3">
            {problem.examples.map((ex, i) => (
              <figure key={i} className="overflow-hidden rounded-xl border border-line">
                <figcaption className="border-b border-line bg-surface-2 px-4 py-2 text-xs font-bold text-faint">
                  Example {i + 1}
                </figcaption>
                <div className="space-y-2 p-4 text-sm">
                  <div>
                    <span className="font-mono text-faint">Input:</span>{" "}
                    <code className="font-mono text-foreground">{ex.input}</code>
                  </div>
                  <div>
                    <span className="font-mono text-faint">Output:</span>{" "}
                    <code className="font-mono text-foreground">{ex.output}</code>
                  </div>
                  {ex.explanation ? (
                    <p className="pt-1 text-xs leading-relaxed text-faint">
                      <span className="font-bold text-muted">Explanation:</span>{" "}
                      {ex.explanation}
                    </p>
                  ) : null}
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-6">
            <Callout variant="tip" title="Constraints">
              <ul className="ml-4 list-disc space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </Callout>
          </div>

          <div className="mt-6">
            <Callout variant="note" title="Expected approach">
              {problem.solutionSummary}
            </Callout>
          </div>
        </div>

        {/* Solver */}
        <div className="min-w-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:self-start">
          <ProblemSolver slug={problem.slug} />
        </div>
      </div>

      {/* Recommended courses */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Level up with a structured course
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
}