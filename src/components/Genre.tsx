import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "src/components/Header";
import { Loader } from "src/components/loader/Loader";
import { MovieList } from "src/components/movieList/MovieList";
import { useFetchMoviesByGenreQuery } from "src/redux/movies";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const genresArray = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 10770,
    name: "TV Movie"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "War"
  },
  {
    id: 37,
    name: "Western"
  }
];

export const Genre = () => {
  const { genre = "" } = useParams<{ genre: string }>();
  /*   const location = useLocation();
  const ploc = queryString.parse(location.search); */
  const genreID = genresArray.find(gen => genre === gen.name)?.id;
  console.log(genreID);

  const { isLoading, data = [] } = useFetchMoviesByGenreQuery(genreID?.toString());

  return (
    <Wrapper>
      <Header title={genre} subtitle="movies" />
      {isLoading ? <Loader /> : <MovieList movies={data} isLoading={isLoading} />}
    </Wrapper>
  );
};
