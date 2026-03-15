import { BatchMoviesResponse } from "@/api/types/movDbTypes";
import { MovieListItem } from "@/components/movieList/movieListItem/MovieListItem";

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map(movie => (
        <div key={movie.id} className="flex justify-center">
          <MovieListItem
            title={movie.title}
            id={movie.id}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        </div>
      ))}
    </div>
  );
};

type MovieListProps = {
  movies: BatchMoviesResponse["results"];
};
