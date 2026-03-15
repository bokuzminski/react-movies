import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMoviesByGenre } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { MoviePagination } from "@/components/movieList/MoviePagination";

export const MoviesByGenre = () => {
  const { genreId, genreName } = useParams<{ genreId: string; genreName: string }>();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchMoviesByGenre(genreId ?? "", page);

  if (isFetching) return <h1>Loading...</h1>;
  if (!data) return <h1>Error: no data to display.</h1>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">{genreName} movies</h1>
      <MovieList movies={data.results} />
      <MoviePagination
        page={page}
        totalPages={Math.min(data.total_pages, 500)}
        onPageChange={setPage}
      />
    </>
  );
};
