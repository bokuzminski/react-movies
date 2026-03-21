import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMoviesByGenre } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { MovieListSkeleton } from "@/components/movieList/MovieListSkeleton";
import { MoviePagination } from "@/components/movieList/MoviePagination";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const MoviesByGenre = () => {
  const { genreId, genreName } = useParams<{ genreId: string; genreName: string }>();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchMoviesByGenre(genreId ?? "", page);

  if (isFetching) return <MovieListSkeleton />;
  if (!data) return <NotFoundPage />;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">{genreName} movies</h1>
      <MovieList movies={data!.results} />
      {data && <MoviePagination page={page} totalPages={Math.min(data.total_pages, 500)} onPageChange={setPage} />}
    </>
  );
};
