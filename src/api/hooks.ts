import axios from "./axios";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
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
export const useFetchGenres = () =>
  useSuspenseQuery({ queryKey: ["genres"], queryFn: fetchGenres, staleTime: Infinity });
export const useFetchPopularMovies = (page: number) =>
  useSuspenseQuery({ queryKey: ["popularMovies", page], queryFn: () => fetchPopularMovies(page) });
export const useFetchTopRatedMovies = (page: number) =>
  useSuspenseQuery({ queryKey: ["topRatedMovies", page], queryFn: () => fetchTopRatedMovies(page) });
export const useFetchUpcomingMovies = (page: number) =>
  useSuspenseQuery({ queryKey: ["upcomingMovies", page], queryFn: () => fetchUpcomingMovies(page) });
export const useFetchMoviesByGenre = (genreId: string, page: number) =>
  useSuspenseQuery({ queryKey: ["moviesByGenre", genreId, page], queryFn: () => fetchMoviesByGenre(genreId, page) });
export const useFetchMovieById = (id: string) =>
  useSuspenseQuery({ queryKey: [`movie/${id}`], queryFn: () => fetchMovieDetails(id) });

export const useSearchMovies = (query: string, page: number) =>
  useQuery({
    queryKey: ["searchMovies", query.trim(), page],
    queryFn: () => fetchSearchMovies(query.trim(), page),
    enabled: query.trim().length > 0
  });
