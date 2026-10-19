import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Users } from "lucide-react";
import type { Course } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { CourseRating } from "../ui/rating";

export function CoursePromoCard({ course }: { course: Course }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="relative aspect-[16/9] bg-surface-2">
        <Image
          src={`https://picsum.photos/seed/${course.thumbnailSeed}/480/270`}
          alt={course.title}
          fill
          className="object-cover"
          sizes="480px"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-semibold text-white">
          Featured course
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold leading-snug text-foreground">
          {course.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-faint">
          {course.tagline}
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <GraduationCap className="size-4 text-primary" />
          <CourseRating rating={course.rating} count={course.reviewCount} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-faint">
            <Users className="size-3.5" /> {formatNumber(course.enrolled)}
          </span>
          <Link
            href={`/courses/${course.slug}`}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary transition-colors hover:bg-primary-hover"
          >
            Enroll now
          </Link>
        </div>
      </div>
    </div>
  );
}