import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMoviesByGenre } from "@/api/hooks";
import { MovieList } from "@/components/movieList/MovieList";
import { Pagination } from "@mui/material";

export const MoviesByGenre = () => {
  const { genreId, genreName } = useParams<{ genreId: string; genreName: string }>();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchMoviesByGenre(genreId ?? "", page);

  if (isFetching) return <h1>Loading...</h1>;
  if (!data) return <h1>Error: no data to display.</h1>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">
        {genreName} movies
      </h1>
      <MovieList movies={data.results} />
      <Pagination
        count={Math.min(data.total_pages, 500)}
        shape="rounded"
        size="large"
        sx={{
          mt: 4,
          "& .MuiPaginationItem-root": {
            fontSize: "1.5rem",
            padding: "10px 20px",
            margin: "0 5px"
          }
        }}
        page={page}
        onChange={(_e, p) => setPage(p)}
      />
    </>
  );
};
