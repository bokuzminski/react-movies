import { Fragment } from "react";
import { Link } from "react-router-dom";
import { DetailedMovie } from "@/api/types/movDbTypes";

export const MovieGenreCategories = ({ genres, inverted }: { genres: DetailedMovie["genres"]; inverted?: boolean }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm">
      {genres.map((genre, i) => (
        <Fragment key={genre.id}>
          {i > 0 && <span className={inverted ? "text-white/50" : "text-muted-foreground/50"}>·</span>}
          <Link
            to={`/genre/${genre.id}/${genre.name}`}
            className={`font-medium uppercase tracking-wide hover:underline ${
              inverted ? "text-white hover:text-white/80" : "text-foreground hover:text-muted-foreground"
            }`}
          >
            {genre.name}
          </Link>
        </Fragment>
      ))}
    </div>
  );
};
