import { useFetchTopRatedMovies } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { MoviePagination } from "@/components/movieList/MoviePagination";
import { useSearchParams } from "react-router";

export const TopRatedMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const { data } = useFetchTopRatedMovies(page);

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  if (!data) return <h1>Error: no data to display.</h1>;

  return (
    <>
      <MovieList movies={data.results} />
      <MoviePagination page={page} totalPages={data.total_pages} onPageChange={handlePageChange} />
    </>
  );
};
