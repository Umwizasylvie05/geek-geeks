import { Star, StarHalf } from "lucide-react";
import { formatRating, formatNumber } from "@/lib/utils";

export function RatingStars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 0.9;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push(<Star key={i} className="size-4 fill-amber-400 text-amber-400" />);
    else if (i === full && hasHalf)
      stars.push(<StarHalf key={i} className="size-4 fill-amber-400 text-amber-400" />);
    else stars.push(<Star key={i} className="size-4 text-surface-3" />);
  }
  return (
    <span className={className}>
      <span className="flex items-center gap-0.5">{stars}</span>
    </span>
  );
}

export function CourseRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="font-semibold text-foreground">{formatRating(rating)}</span>
      <RatingStars rating={rating} />
      <span className="text-faint">({formatNumber(count)})</span>
    </div>
  );
}