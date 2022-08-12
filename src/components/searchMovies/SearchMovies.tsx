import React from "react";
import { useParams } from "react-router";
import { Header } from "src/components/Header";
import { MovieList } from "src/components/movieList/MovieList";
import { useFetchMoviesWithSearchQueryQuery } from "src/redux/movies";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const SearchMovies = () => {
  const { query = "" } = useParams();
  const { data = [], isLoading } = useFetchMoviesWithSearchQueryQuery(query);

  return (
    <Wrapper>
      <Header title={query} subtitle="results" />
      <MovieList movies={data} isLoading={isLoading} />
    </Wrapper>
  );
};
