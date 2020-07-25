import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import queryString from 'query-string';

import Header from './Header';
import FilmItem from './FilmItem';
import Loader from './Loader';
import movdb, { api_key } from '../api/movdb';
import { useStore } from '../globalState/moviesState';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Genre = (params) => {
  const { gen } = useParams();
  const location = useLocation();
  const ploc = queryString.parse(location.search);
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useStore();

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    setLoading(true);
    try {
      const myID = state.genres.genres
        .filter((el) => el.name === gen)
        .map((el) => el.id)
        .join('');
      movdb
        .get(`/discover/movie${api_key}`, {
          params: {
            page: ploc.page,
            with_genres: myID,
            sort_by: 'popularity.desc',
          },
        })
        .then((res) => {
          dispatch({
            type: 'FETCH_MOVIES',
            payload: res.data,
          });
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [gen, state.genres.genres]);

  return (
    <Wrapper>
      <Header title={gen} subtitle="movies" />
      {!loading ? <FilmItem film={state.movies} /> : <Loader />}
    </Wrapper>
  );
};

export default Genre;
