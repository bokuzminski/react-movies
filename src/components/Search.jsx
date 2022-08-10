import queryString from "query-string";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import styled from "styled-components";
import Header from "./Header";

import movdb, { api_key } from "../api/movdb";
import { useStore } from "../globalState/moviesState";
import Loader from "./Loader";
import FilmItem from "./movieList/MovieList";
import NotFound from "./NotFound";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Search = () => {
  const location = useLocation();
  const param = queryString.parse(location.search);
  const { query } = useParams();

  const [state, dispatch] = useStore();

  const getMovie = query => {
    dispatch({
      type: "FETCH_MOVIES_LOADING"
    });
    movdb
      .get(`/search/movie${api_key}`, {
        params: {
          query,
          page: param.page
        }
      })
      .then(res => {
        dispatch({
          type: "FETCH_MOVIES",
          payload: res.data
        });

        dispatch({
          type: "FINISHED_FETCHING_MOVIES"
        });
      });
  };
  useEffect(() => {
    getMovie(query);
    scroll.scrollToTop({
      smooth: true
    });
  }, [query, location]);

  if (state.movies.loading) {
    return <Loader />;
  } else if (state.movies.total_results === 0) {
    return <NotFound title=":(" subtitle={`There were no results for ${query}`} />;
  } else {
    return (
      <Wrapper>
        <Header title={query} subtitle="results" />
        <FilmItem film={state.movies} />
      </Wrapper>
    );
  }
};

export default Search;
