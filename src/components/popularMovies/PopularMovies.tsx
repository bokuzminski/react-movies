import React from "react";
import { useFetchPopularMoviesQuery } from "src/redux/movies";
import styled from "styled-components";
import { Loader } from "../loader/Loader";
import { MovieList } from "../movieList/MovieList";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const PopularMovies = () => {
  const { data = [], isLoading } = useFetchPopularMoviesQuery();

  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <title>Popular movies</title>
      <MovieList movies={data} isLoading={isLoading} />
    </Wrapper>
  );
};
