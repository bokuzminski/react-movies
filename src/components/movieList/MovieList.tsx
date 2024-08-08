import { Grid, Pagination, Skeleton } from "@mui/material";
import { BatchMoviesResponse } from "src/api/types/movDbTypes";
import { MovieListItem } from "src/components/movieList/movieListItem/MovieListItem";

export const MovieList = ({ isLoading, movies, setPage, page }: MovieListProps) => {
  return (
    <Grid container rowGap={3} alignItems="start">
      {movies.map(movie => (
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={2.4}
          key={movie.id}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <MovieListItem key={movie.id} title={movie.title} id={movie.id} poster_path={movie.poster_path} />
        </Grid>
      ))}
      <Grid item xs={12} container justifyContent="center">
        {/* TODO: Pagination loginc*/}
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
      </Grid>
    </Grid>
  );
};

type MovieListProps = {
  isLoading: boolean;
  movies: BatchMoviesResponse["results"];
  page: number;
  setPage: (page: number) => void;
};
