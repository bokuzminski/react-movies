import { useState } from "react";
import { useFetchPopularMovies } from "../api/hooks";
import { MovieList } from "../components/movieList/MovieList";

export const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchPopularMovies(page);
  if (isFetching) return <h1>Loading...</h1>;

  return <MovieList isLoading={isFetching} movies={data?.results} page={page} setPage={setPage} />;
};
