import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BatchMoviesResponse, DetailedMovie, Genre } from "src/redux/movdbModel";

const soloKey = "fdb613df5a00fae0d6f39cb82be7b091";
const api_key = `?api_key=fdb613df5a00fae0d6f39cb82be7b091`;

export const moviesApi = createApi({
  reducerPath: "movieDbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  tagTypes: ["movies", "movie"],
  endpoints: builder => ({
    fetchAvailableGenres: builder.query<Genre[], void>({
      query: () => `genre/movie/list?api_key=${soloKey}`,
      transformResponse: (response: { genres: Genre[] }) => response.genres
    }),
    fetchPopularMovies: builder.query<BatchMoviesResponse["results"], void>({
      query: () => `/movie/popular${api_key}`,
      providesTags: ["movies"],
      transformResponse: (response: BatchMoviesResponse) => response.results
    }),
    feetchMovieById: builder.query<DetailedMovie, string>({
      query: (id: string) => `/movie/${id}?api_key=${soloKey}`,
      providesTags: result => (result ? [{ type: "movie", id: result.id }] : ["movie"])
    }),
    fetchMoviesByGenre: builder.query<BatchMoviesResponse["results"], string>({
      query: (genre: string) => `discover/movie?api_key=${soloKey}&with_genres=${genre}`,
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
