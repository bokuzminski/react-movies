import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";

import FilmItem from "./FilmItem";
import NotFound from "./NotFound";
import Loader from "./Loader";
import movdb, { api_key } from "../api/movdb";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Search = () => {
  const location = useLocation();
  const param = queryString.parse(location.search);
  const { query } = useParams();
  const [Films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovie = (query) => {
    setLoading(true);
    movdb
      .get(`/search/movie${api_key}`, {
        params: {
          query,
          page: param.page,
        },
      })
      .then((res) => {
        setFilms(res.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    getMovie(query);
    scroll.scrollToTop({
      smooth: true,
    });
  }, [query, location]);

  if (loading) {
    return <Loader />;
  } else if (Films.total_results === 0) {
    return (
      <NotFound title=":(" subtitle={`There were no results for ${query}`} />
    );
  } else {
    return (
      <Wrapper>
        <Header title={query} subtitle="results" />
        <FilmItem film={Films} />
      </Wrapper>
    );
  }
};

export default Search;
