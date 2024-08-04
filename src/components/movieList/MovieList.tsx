import { Grid, Pagination, Skeleton } from "@mui/material";
import React from "react";
import { Loader } from "src/components/loader/Loader";
import { MovieListItem } from "src/components/movieList/movieListItem/MovieListItem";
import { BatchMoviesResponse } from "src/redux/movdbModel";

export const MovieList = ({ isLoading, movies }: MovieListProps) => {
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
          count={15}
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
        />
      </Grid>
    </Grid>
  );
};

type MovieListProps = {
  movies: BatchMoviesResponse["results"];
  isLoading: boolean;
};
