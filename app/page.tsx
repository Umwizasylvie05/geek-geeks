import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExploreGrid } from "@/components/home/explore-grid";
import { CoursePromoGrid } from "@/components/home/course-promo-grid";
import { SectionHeader } from "@/components/ui/section";

export default function HomePage() {
  return (
    <div className="fade-in w-3/5 mx-auto">
      {/* Hero */}
      <section className="border-b border-line bg-surface py-10 text-center">
        <div className="mx-auto w-3/4 max-w-full px-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Start Your Learning Today!
          </h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/courses?category=dsa"
              className="rounded-full border border-primary bg-primary px-5 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
            >
              Placement 360
            </Link>
            <Link
              href="/courses"
              className="rounded-full border border-primary bg-primary-soft px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
            >
              Data Science 360
            </Link>
            <Link
              href="/courses?category=web-dev"
              className="rounded-full border border-line bg-surface-2 px-5 py-2 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
            >
              Full Stack Dev
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-full px-4 py-6">
        {/* Explore */}
        <section className="mb-12">
          <SectionHeader
            title="Explore"
            subtitle="Find tutorials, courses and practice for your favourite topic"
          />
          <ExploreGrid />
        </section>

        {/* Advertising CTA */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary px-6 py-7 text-white sm:px-8">
            <div>
              <h2 className="text-lg font-extrabold sm:text-xl">
                Interested in advertising with us?
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Reach thousands of developers learning on the platform.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-emerald-50"
            >
              Get in touch
            </Link>
          </div>
        </section>

        {/* Courses */}
        <section className="mb-12">
          <SectionHeader
            title="Courses"
            subtitle="Guided paths with structured curricula, taught by industry experts"
            link={{ label: "View All", href: "/courses" }}
          />
          <CoursePromoGrid />
        </section>

        {/* Must Explore */}
        <section>
          <SectionHeader title="Must Explore" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Trending Now",
                href: "/category/dsa",
                bg: "bg-sky-600",
              },
              {
                label: "Watch Videos",
                href: "/courses",
                bg: "bg-emerald-600",
              },
              {
                label: "GfG Coding Contest",
                href: "/practice",
                bg: "bg-orange-600",
              },
              {
                label: "Advertise with Us",
                href: "/contact",
                bg: "bg-rose-600",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center justify-between gap-3 rounded-xl px-5 py-6 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 ${item.bg}`}
              >
                {item.label}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors group-hover:bg-white group-hover:text-foreground">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
