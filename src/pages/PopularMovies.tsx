import { useState } from "react";
import { useFetchPopularMovies } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { MovieListSkeleton } from "@/components/movieList/MovieListSkeleton";
import { MoviePagination } from "@/components/movieList/MoviePagination";

export const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchPopularMovies(page);

  if (!data && !isFetching) return <h1>Error: no data to display.</h1>;

  return (
    <>
      {isFetching ? <MovieListSkeleton /> : <MovieList movies={data!.results} />}
      {data && (
        <MoviePagination
          page={page}
          totalPages={Math.min(data.total_pages, 500)}
          onPageChange={setPage}
        />
      )}
    </>
  );
};
