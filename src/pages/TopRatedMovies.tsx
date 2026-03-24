import { useState } from "react";
import { useFetchTopRatedMovies } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { MovieListSkeleton } from "@/components/movieList/MovieListSkeleton";
import { MoviePagination } from "@/components/movieList/MoviePagination";

export const TopRatedMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchTopRatedMovies(page);

  if (!data && !isFetching) return <h1>Error: no data to display.</h1>;

  return (
    <>
      {isFetching ? <MovieListSkeleton /> : <MovieList movies={data!.results} />}
      {data && <MoviePagination page={page} totalPages={data.total_pages || 100} onPageChange={setPage} />}
    </>
  );
};
