import { Star, StarHalf } from "lucide-react";

import { cn } from "@/lib/utils";

type VoteAverageStarsProps = {
  /** TMDB vote_average is 0–10; stars are shown on a 0–5 scale (value / 2). */
  voteAverage: number;
  /** When true, stars read well on dark hero backdrops */
  onDarkBackdrop?: boolean;
};

export function VoteAverageStars({ voteAverage, onDarkBackdrop }: VoteAverageStarsProps) {
  const value = Math.min(5, Math.max(0, voteAverage / 2));
  const filledClass = onDarkBackdrop
    ? "fill-amber-300 text-amber-300"
    : "fill-amber-400 text-amber-400";
  const emptyClass = onDarkBackdrop ? "text-white/35" : "text-muted-foreground/40";

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rating ${voteAverage.toFixed(1)} out of 10`}>
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        if (value >= starValue) {
          return <Star key={i} className={cn("size-5 shrink-0", filledClass)} aria-hidden />;
        }
        if (value >= starValue - 0.5) {
          return <StarHalf key={i} className={cn("size-5 shrink-0", filledClass)} aria-hidden />;
        }
        return <Star key={i} className={cn("size-5 shrink-0", emptyClass)} aria-hidden />;
      })}
    </div>
  );
}
