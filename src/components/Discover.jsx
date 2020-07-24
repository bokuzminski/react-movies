import React, { useEffect } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import FilmItem from './FilmItem';
import Loader from './Loader';
import { useLocation } from 'react-router-dom';
import movdb, { api_key } from '../api/movdb';
import { useStore } from '../globalState/state';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Discover = () => {
  const location = useLocation();
  const param = queryString.parse(location.search);

  const [state, dispatch] = useStore();

  /*   useEffect(() => {
    movdb
      .get(`/movie/popular${api_key}`, {
        params: {
          page: param.page,
        },
      })
      .then((response) => {
        setFilms(response.data);
      });
  }, [location]); */
  useEffect(() => {
    movdb
      .get(`/movie/popular${api_key}`, {
        params: {
          page: param.page,
        },
      })
      .then((response) => {
        //setFilms(response.data);
        dispatch({
          type: 'FETCH_MOVIES',
          payload: response.data,
        });
        dispatch({
          type: 'FINISHED_FETCHING',
        });
      });
  }, [location]);

  if (!state.loading) {
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
