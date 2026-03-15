import { useState } from "react";
import { useFetchTopRatedMovies } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { MoviePagination } from "@/components/movieList/MoviePagination";

export const TopRatedMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchTopRatedMovies(page);

  if (isFetching) return <h1>Loading...</h1>;
  if (!data) return <h1>Error: no data to display.</h1>;

  return (
    <>
      <MovieList movies={data.results} />
      <MoviePagination
        page={page}
        totalPages={data.total_pages || 100}
        onPageChange={setPage}
      />
    </>
  );
};
