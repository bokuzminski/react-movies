import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesByGenre",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  tagTypes: ["movies", "movie"],
  endpoints: builder => ({
    fetchPopularMovies: builder.query<Movie[], void>({
      query: () => `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: ["movies"],
      transformResponse: (response: MovieResponse) => {
        const { results } = response;
        return results;
      }
    }),
    feetchMovieById: builder.query<MovieDetails, string>({
      query: (id: string) => `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: result => (result ? [{ type: "movie", id: result.id }] : ["movie"])
    }),
    fetchMoviesByGenre: builder.query<MovieResponse, string>({
      query: (genre: string) => `discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}`
    })
  })
});

export const { useFetchPopularMoviesQuery, useFeetchMovieByIdQuery, useFetchMoviesByGenreQuery } = moviesApi;

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export type Movie = {
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

type StateType = Record<number, MovieDetails>;
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
