import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Users } from "lucide-react";
import type { Course } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { CourseRating } from "../ui/rating";

export function CourseCard({ course }: { course: Course }) {
  const free = course.price === null || course.price === 0;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-shadow hover:shadow-md">
      <Link
        href={`/courses/${course.slug}`}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[16/9] overflow-hidden bg-surface-2"
      >
        <Image
          src={`https://picsum.photos/seed/${course.thumbnailSeed}/480/270`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          {course.category}
        </span>
        {free ? (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase text-on-primary">
            Free
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-link">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="line-clamp-1 text-xs text-faint">
          By <span className="font-medium text-muted">{course.instructor}</span>
        </p>
        <CourseRating rating={course.rating} count={course.reviewCount} />
        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <span className="flex items-center gap-1.5 text-xs text-faint">
            <Users className="size-3.5" /> {formatNumber(course.enrolled)} enrolled
            <span className="mx-0.5">·</span>
            <GraduationCap className="size-3.5" /> {course.level}
          </span>
          <span className="text-sm font-bold text-foreground">
            {free ? (
              <span className="text-primary">Free</span>
            ) : (
              <>
                <span className="mr-1 text-xs font-normal text-faint line-through">
                  ${Math.round((course.price ?? 0) * 1.4)}
                </span>${course.price}
              </>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}