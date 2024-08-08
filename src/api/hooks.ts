import { useQuery } from "react-query";
import { BatchMoviesResponse, Genre } from "../redux/movdbModel";
import axios from "./axios";
import { AxiosRequestConfig } from "axios";

// Hooks
const fetchGenres = async (options?: AxiosRequestConfig) => {
  const { data } = await axios.get<{ genres: Genre[] }>("genre/movie/list", options);
  return data.genres;
};

const fetchPopularMovies = async (page: number) => {
  const { data } = await axios.get<BatchMoviesResponse>("movie/popular", {
    params: { page }
  });
  return data;
};

// Exported hooks
export const useFetchGenres = () =>
  useQuery<Genre[], Error>("genres", fetchGenres, { staleTime: Infinity, cacheTime: Infinity, initialData: [] });
export const useFetchPopularMovies = (page: number) =>
  useQuery(["popularMovies", page], () => fetchPopularMovies(page));
