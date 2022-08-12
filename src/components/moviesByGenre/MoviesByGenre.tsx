import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "src/components/Header";
import { MovieList } from "src/components/movieList/MovieList";
import { useFetchMoviesByGenreQuery } from "src/redux/movies";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const MoviesByGenre = () => {
  const { genreId, genreName } = useParams<{ genre: string; genreName: string }>();
  const { isLoading, data = [] } = useFetchMoviesByGenreQuery(genreId);

  return (
    <Wrapper>
      <Header title={genreName} subtitle="movies" />
      <MovieList movies={data} isLoading={isLoading} />
    </Wrapper>
  );
};
