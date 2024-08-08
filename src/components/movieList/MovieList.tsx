import { Grid } from "@mui/material";
import { BatchMoviesResponse } from "src/api/types/movDbTypes";
import { MovieListItem } from "src/components/movieList/movieListItem/MovieListItem";

export const MovieList = ({ movies }: MovieListProps) => {
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
    </Grid>
  );
};

type MovieListProps = {
  movies: BatchMoviesResponse["results"];
};
