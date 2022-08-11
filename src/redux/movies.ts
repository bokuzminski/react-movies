import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BatchMoviesResponse, DetailedMovie } from "src/redux/movdbModel";

const api_key = `?api_key=${process.env.REACT_APP_API_KEY}`;

export const moviesApi = createApi({
  reducerPath: "moviesByGenre",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  tagTypes: ["movies", "movie"],
  endpoints: builder => ({
    fetchPopularMovies: builder.query<BatchMoviesResponse["results"], void>({
      query: () => `/movie/popular${api_key}`,
      providesTags: ["movies"],
      transformResponse: (response: BatchMoviesResponse) => response.results
    }),
    feetchMovieById: builder.query<DetailedMovie, string>({
      query: (id: string) => `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: result => (result ? [{ type: "movie", id: result.id }] : ["movie"])
    }),
    fetchMoviesByGenre: builder.query<BatchMoviesResponse["results"], string>({
      query: (genre: string) => `discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}`,
      transformResponse: (response: BatchMoviesResponse) => response.results
    })
  })
});

export const { useFetchPopularMoviesQuery, useFeetchMovieByIdQuery, useFetchMoviesByGenreQuery } = moviesApi;
