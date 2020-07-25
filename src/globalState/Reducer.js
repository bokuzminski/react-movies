import { act } from 'react-dom/test-utils';

const Reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return {
        ...state,
        movies: {
          ...state.movies,
          ...action.payload,
        },
      };
    case 'FINISHED_FETCHING_MOVIES':
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: false,
        },
      };
    case 'FETCH_MOVIES_LOADING':
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: true,
        },
      };
    case 'FETCH_SINGLE_MOVIE':
      return {
        ...state,
        movie: {
          ...state.movie,
          ...action.payload,
        },
      };
    case 'FINISHED_FETCHING_GENRES':
      return {
        ...state,
        genres: {
          ...state.genres,
          loading: false,
        },
      };
    case 'FETCH_GENRES':
      return {
        ...state,
        genres: {
          ...state.genres,
          ...action.payload,
        },
      };
    case 'FETCH_GENRES_LOADING':
      return {
        ...state,
        genres: {
          ...state.genres,
          loading: true,
        },
      };
    case 'FETCH_SIMILAR_MOVIES':
      return {
        ...state,
        similar: {
          ...state.similar,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default Reducer;
