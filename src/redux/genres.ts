import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genresApi = createApi({
  reducerPath: "genres",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: builder => ({
    fetchAvailableGenres: builder.query<Genre[], null>({
      query: () => `genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
      transformResponse: (response: RespGenre) => response.genres
    })
  })
});

export const { useFetchAvailableGenresQuery } = genresApi;

export type Genre = {
  id: number;
  name: string;
};
type RespGenre = {
  genres: Genre[];
};
