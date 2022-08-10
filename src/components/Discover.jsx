import queryString from "query-string";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import movdb, { api_key } from "../api/movdb";
import { useStore } from "../globalState/moviesState";
import Loader from "./Loader";
import FilmItem from "./movieList/MovieList";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Discover = () => {
  const location = useLocation();
  const param = queryString.parse(location.search);

  const [state, dispatch] = useStore();

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES_LOADING" });
    movdb
      .get(`/movie/popular${api_key}`, {
        params: {
          page: param.page
        }
      })
      .then(response => {
        dispatch({
          type: "FETCH_MOVIES",
          payload: response.data
        });
        dispatch({
          type: "FINISHED_FETCHING_MOVIES"
        });
      });
  }, [location]);

  if (!state.movies.loading) {
    return (
      <Wrapper>
        <title>Popular movies</title>
        <FilmItem film={state.movies} />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
};

export default Discover;
