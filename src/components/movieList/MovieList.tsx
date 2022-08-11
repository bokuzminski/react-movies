import React from "react";
import { Loader } from "src/components/Loader";
import { MovieListItem } from "src/components/movieList/movieListItem/MovieListItem";
import { Movie } from "src/redux/movies";
import styled from "styled-components";

const MoviesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 4rem 0;
  grid-gap: 4rem 2rem;
  @media ${props => props.theme.mediaQueries.small} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 23rem));
    justify-content: space-around;
    grid-gap: 4rem 1.5rem;
  }
  @media ${props => props.theme.mediaQueries.smaller} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 18rem));
    grid-gap: 4rem 1rem;
  }
`;

export const MovieList = ({ isLoading, movies }: MovieListProps) => {
  if (isLoading || !movies) return <Loader />;

  return (
    <>
      <MoviesWrapper>
        {movies.map(movie => (
          <MovieListItem key={movie.id} title={movie.title} id={movie.id} poster_path={movie.poster_path} />
        ))}
      </MoviesWrapper>
      {/* <Pagination film={film} /> */}
    </>
  );
};

type MovieListProps = {
  movies: Movie[];
  isLoading: boolean;
};
