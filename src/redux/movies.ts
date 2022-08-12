import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BatchMoviesResponse, DetailedMovie, Genre } from "src/redux/movdbModel";

const api_key = `?api_key=${process.env.REACT_APP_API_KEY}`;

export const moviesApi = createApi({
  reducerPath: "movieDbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  tagTypes: ["movies", "movie"],
  endpoints: builder => ({
    fetchAvailableGenres: builder.query<Genre[], void>({
      query: () => `genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
      transformResponse: (response: { genres: Genre[] }) => response.genres
    }),
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
    }),
    fetchSimilarMovies: builder.query<BatchMoviesResponse["results"], number>({
      query: (movieId: number) => `/movie/${movieId}/similar${api_key}`,
      transformResponse: (response: BatchMoviesResponse) => response.results
    }),
    fetchMoviesWithSearchQuery: builder.query<BatchMoviesResponse["results"], string>({
      query: (query: string) => ({
        url: `search/movie${api_key}`,
        params: { query }
      }),
      transformResponse: (response: BatchMoviesResponse) => response.results
    })
  })
});

export const {
  useFetchAvailableGenresQuery,
  useFetchSimilarMoviesQuery,
  useFetchPopularMoviesQuery,
  useFeetchMovieByIdQuery,
  useFetchMoviesByGenreQuery,
  useFetchMoviesWithSearchQueryQuery
} = moviesApi;
