import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import queryString from "query-string";

import Header from "./Header";
import FilmItem from "./FilmItem";
import Loader from "./Loader";
import movdb, { api_key } from "../api/movdb";

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
  const [genres, setgenres] = useState({
    genIDs: [],
    movies: [],
  });

  useEffect(() => {
    setgenres({ genIDs: params.genres, movies: genres.movies, loading: true });
  }, []);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    setLoading(true);
    try {
      const myID = params.genres
        .filter((el) => el.name === gen)
        .map((el) => el.id)
        .join("");
      setgenres({
        genIDs: genres.genIDs,
        movies: genres.movies,
      });

      movdb
        .get(`/discover/movie${api_key}`, {
          params: { page: ploc.page, with_genres: myID, sort_by: "popularity.desc" },
        })
        .then((res) => {
          setgenres({
            genIDs: genres.genIDs,
            movies: res.data,
          });
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      throw error;
      
    }
  }, [gen, location]);

  return (
    <Wrapper>
      <Header title={gen} subtitle="movies"/>
      {!loading ? <FilmItem film={genres.movies} /> : <Loader />}
      {/* {params.genres.map((f) => (
          <h2>{f.id}</h2>
        ))} */}
    </Wrapper>
  );
};

export default Genre;
