import { useQuery } from "react-query";

import axios from "./axios";
import { PaginatedMoviesResponse, DetailedMovie, Genre } from "@/api/tmdbTypes";

// Hooks
const fetchGenres = async () => {
  const { data } = await axios.get<{ genres: Genre[] }>("genre/movie/list");
  return data.genres;
};

const fetchPopularMovies = async (page: number) => {
  const { data } = await axios.get<PaginatedMoviesResponse>("movie/popular", {
    params: { page }
  });
  return data;
};

const fetchTopRatedMovies = async (page: number) => {
  const { data } = await axios.get<PaginatedMoviesResponse>("movie/top_rated", {
    params: { page }
  });
  return data;
};

const fetchUpcomingMovies = async (page: number) => {
  const { data } = await axios.get<PaginatedMoviesResponse>("movie/upcoming", {
    params: { page }
  });
  return data;
};

const fetchMoviesByGenre = async (genreId: string, page: number) => {
  const { data } = await axios.get<PaginatedMoviesResponse>("discover/movie", {
    params: { with_genres: genreId, page }
  });
  return data;
};

const fetchMovieDetails = async (id: string) => {
  const { data } = await axios.get<DetailedMovie>(`movie/${id}`, {
    params: { append_to_response: "credits,videos,external_ids" }
  });
  return data;
};

const fetchSearchMovies = async (query: string, page: number) => {
  const { data } = await axios.get<PaginatedMoviesResponse>("search/movie", {
    params: { query, page }
  });
  return data;
};

// Exported hooks
export const useFetchGenres = () => useQuery("genres", fetchGenres, { staleTime: Infinity, cacheTime: Infinity });
export const useFetchPopularMovies = (page: number) =>
  useQuery(["popularMovies", page], () => fetchPopularMovies(page));
export const useFetchTopRatedMovies = (page: number) =>
  useQuery(["topRatedMovies", page], () => fetchTopRatedMovies(page));
export const useFetchUpcomingMovies = (page: number) =>
  useQuery(["upcomingMovies", page], () => fetchUpcomingMovies(page));
export const useFetchMoviesByGenre = (genreId: string, page: number) =>
  useQuery(["moviesByGenre", genreId, page], () => fetchMoviesByGenre(genreId, page));
export const useFetchMovieById = (id: string) => useQuery([`movie/${id}`], () => fetchMovieDetails(id));

export const useSearchMovies = (query: string, page: number) => {
  const trimmed = query.trim();
  return useQuery(["searchMovies", trimmed, page], () => fetchSearchMovies(trimmed, page), {
    enabled: trimmed.length > 0
  });
};
