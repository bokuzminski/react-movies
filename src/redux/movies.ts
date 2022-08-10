import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Genre } from "src/redux/genres";

export const moviesApi = createApi({
  reducerPath: "moviesByGenre",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: builder => ({
    fetchPopularMovies: builder.query<ReducerStateType, void>({
      query: () => `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,
      transformResponse: (response: MovieResponse) => {
        const { results } = response;
        return { popular: results };
      }
    })
  })
});

export const { useFetchPopularMoviesQuery } = moviesApi;

type ReducerStateType = {
  popular: Movie[];
};
export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Genre["id"][];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
