import React, { useEffect } from 'react';
import Header from './Header';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import FilmItem from './FilmItem';
import NotFound from './NotFound';
import Loader from './Loader';
import movdb, { api_key } from '../api/movdb';
import { useStore } from '../globalState/moviesState';

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

  const getMovie = (query) => {
    dispatch({
      type: 'FETCH_MOVIES_LOADING',
    });
    movdb
      .get(`/search/movie${api_key}`, {
        params: {
          query,
          page: param.page,
        },
      })
      .then((res) => {
        dispatch({
          type: 'FETCH_MOVIES',
          payload: res.data,
        });

        dispatch({
          type: 'FINISHED_FETCHING_MOVIES',
        });
      });
  };
  useEffect(() => {
    getMovie(query);
    scroll.scrollToTop({
      smooth: true,
    });
  }, [query, location]);

  if (state.movies.loading) {
    return <Loader />;
  } else if (state.movies.total_results === 0) {
    return (
      <NotFound title=":(" subtitle={`There were no results for ${query}`} />
    );
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
