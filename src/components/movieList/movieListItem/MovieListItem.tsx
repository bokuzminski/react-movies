import { ImageOff, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MovieListItem = ({ id, poster_path, title, vote_average }: MovieListItemProps) => {
  return (
    <Link to={`/${id}`} className="block w-full no-underline">
      <Card className="group relative overflow-hidden aspect-[2/3] w-full p-0 transition-transform duration-300 hover:scale-[1.02]">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="size-full object-cover object-top absolute inset-0 z-0"
          />
        ) : (
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-muted">
            <ImageOff className="size-16 text-muted-foreground" />
          </div>
        )}
        {/* Overlay gradient - keeps dark bar at bottom on hover for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 group-hover:from-black/80 group-hover:via-black/20 group-hover:to-transparent transition-all duration-500" />
        <div className="isolate z-50 flex flex-col gap-2 relative grow justify-end min-h-0">
          <CardHeader className="px-4 pb-0 pt-0">
            <CardTitle className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-2">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-1.5 px-4 pb-3 pt-0">
            <Star className="size-4 fill-amber-400 text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
            <span className="text-sm font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {Number(vote_average).toFixed(1)}
            </span>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

type MovieListItemProps = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};
