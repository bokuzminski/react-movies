import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "src/components/Header";
import { Loader } from "src/components/Loader";
import { MovieList } from "src/components/movieList/MovieList";
import { useFetchMoviesByGenreQuery } from "src/redux/movies";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Genre = () => {
  const { genre } = useParams<{ genre: string }>();
  /*   const location = useLocation();
  const ploc = queryString.parse(location.search); */
  const { isLoading, data } = useFetchMoviesByGenreQuery(genre!);

  return (
    <Wrapper>
      <Header title={genre!} subtitle="movies" />
      {isLoading ? <Loader /> : <MovieList movies={data!} isLoading={isLoading} />}
    </Wrapper>
  );
};
