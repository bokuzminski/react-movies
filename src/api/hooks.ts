import { useQuery } from "react-query";

import axios from "./axios";
import { BatchMoviesResponse, DetailedMovie, Genre } from "src/api/types/movDbTypes";

// Hooks
const fetchGenres = async () => {
  const { data } = await axios.get<{ genres: Genre[] }>("genre/movie/list");
  return data.genres;
};

const fetchPopularMovies = async (page: number) => {
  const { data } = await axios.get<BatchMoviesResponse>("movie/popular", {
    params: { page }
  });
  return data;
};

const fetchTopRatedMovies = async (page: number) => {
  const { data } = await axios.get<BatchMoviesResponse>("movie/top_rated", {
    params: { page }
  });
  return data;
};

const fetchUpcomingMovies = async (page: number) => {
  const { data } = await axios.get<BatchMoviesResponse>("movie/upcoming", {
    params: { page }
  });
  return data;
};

const fetchMovieDetails = async (id: string) => {
  const { data } = await axios.get<DetailedMovie>(`movie/${id}`, {
    params: { append_to_response: "credits,videos,external_ids" }
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
export const useFetchMovieById = (id: string) => useQuery([`movie/${id}`], () => fetchMovieDetails(id));
