import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moviesApi } from "src/redux/movies";
import { genresApi } from "./genres";

export const store = configureStore({
  reducer: {
    [genresApi.reducerPath]: genresApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(genresApi.middleware)
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
