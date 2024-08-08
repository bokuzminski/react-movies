import { useState } from "react";
import { useFetchPopularMovies } from "../api/hooks";
import { MovieList } from "../components/movieList/MovieList";
import { Pagination } from "@mui/material";

export const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchPopularMovies(page);

  if (isFetching) return <h1>Loading...</h1>;
  if (!data) return <h1>Error: no data to display.</h1>;

  return (
    <>
      <MovieList movies={data.results} />
      <Pagination
        count={500}
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
        defaultPage={page}
        onChange={(_e, page) => setPage(page)}
      />
    </>
  );
};
