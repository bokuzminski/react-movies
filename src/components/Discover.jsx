import React, { useEffect, useState } from "react";
import styled from "styled-components";
import queryString from "query-string";
import FilmItem from "./FilmItem";
import Loader from "./Loader";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import movdb, { api_key } from "../api/movdb";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Discover = () => {
  const location = useLocation();
  const param = queryString.parse(location.search);
  const apiurl =
    "https://api.themoviedb.org/3/movie/popular?api_key=e366d974f73ae203397850eadc7bce1f";
  const [films, setFilms] = useState([]);

  useEffect(() => {
    movdb
      .get(`/movie/popular${api_key}`, {
        params: {
          page: param.page,
        },
      })
      .then((response) => {
        setFilms(response.data);
      });
  }, [location]);

  if (Object.keys(films).length > 0) {
    return (
      <Wrapper>
        <title>Popular movies</title>
        <FilmItem film={films} />
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
