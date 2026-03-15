import { Fragment } from "react";
import { Link } from "react-router-dom";
import { DetailedMovie } from "@/api/types/movDbTypes";

export const MovieGenreCategories = ({ genres }: { genres: DetailedMovie["genres"] }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm">
      {genres.map((genre, i) => (
        <Fragment key={genre.id}>
          {i > 0 && <span className="text-muted-foreground/50">·</span>}
          <Link
            to={`/genre/${genre.id}/${genre.name}`}
            className="font-medium uppercase tracking-wide text-foreground hover:text-muted-foreground hover:underline"
          >
            {genre.name}
          </Link>
        </Fragment>
      ))}
    </div>
  );
};
