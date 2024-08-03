import { Grid, Pagination } from "@mui/material";
import React from "react";
import { Loader } from "src/components/loader/Loader";
import { MovieListItem } from "src/components/movieList/movieListItem/MovieListItem";
import { BatchMoviesResponse } from "src/redux/movdbModel";

export const MovieList = ({ isLoading, movies }: MovieListProps) => {
  if (isLoading || !movies) return <Loader />;

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {movies.map(movie => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieListItem key={movie.id} title={movie.title} id={movie.id} poster_path={movie.poster_path} />
        </Grid>
      ))}
      <Grid item xs={12} container justifyContent="center">
        {/* TODO: Pagination loginc*/}
        <Pagination count={15} shape="rounded" size="large" sx={{ mt: 4 }} />
      </Grid>
    </Grid>
  );
};

type MovieListProps = {
  movies: BatchMoviesResponse["results"];
  isLoading: boolean;
};
