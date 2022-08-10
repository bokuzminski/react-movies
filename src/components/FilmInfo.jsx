import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from "query-string";
import React from "react";
import LazyLoad from "react-lazyload";
import { animateScroll as scroll, Element } from "react-scroll";
import styled from "styled-components";

import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import movdb, { api_key } from "../api/movdb";
import { useStore } from "../globalState/moviesState";
import Header from "./Header";
import Loader from "./Loader";
import Loading from "./Loading";
import FilmItem from "./movieList/MovieList";
import Rating from "./Rating";

//styled components
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const MovieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 7rem;
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
  @media ${props => props.theme.mediaQueries.largest} {
    max-width: 105rem;
  }
  @media ${props => props.theme.mediaQueries.larger} {
    max-width: 110rem;
    margin-bottom: 6rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    max-width: 110rem;
    margin-bottom: 5rem;
  }
  @media ${props => props.theme.mediaQueries.medium} {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-primary-light);
  text-transform: uppercase;
  padding: 0.5rem 0rem;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  &:not(:last-child) {
    margin-right: 2rem;
  }
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const MovieDetails = styled.div`
  width: 100%;
  max-width: 60%;
  padding: 4rem;
  flex: 1 1 60%;
  @media ${props => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    padding: 2rem;
  }
  @media ${props => props.theme.mediaQueries.smaller} {
    padding: 1rem;
  }
  @media ${props => props.theme.mediaQueries.smallest} {
    padding: 0rem;
  }
  @media ${props => props.theme.mediaQueries.medium} {
    max-width: 100%;
    flex: 1 1 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 4rem;
  @media ${props => props.theme.mediaQueries.largest} {
    padding: 3rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    padding: 2rem;
  }
  @media ${props => props.theme.mediaQueries.smaller} {
    margin-bottom: 2rem;
  }
  @media ${props => props.theme.mediaQueries.medium} {
    max-width: 60%;
    flex: 1 1 60%;
  }
`;

const MovieImg = styled.img`
  max-height: 100%;
  height: ${props => (props.error ? "25rem" : "auto")};
  object-fit: ${props => (props.error ? "contain" : "cover")};
  padding: ${props => (props.error ? "2rem" : "")};
  max-width: 100%;
  border-radius: 0.8rem;
  box-shadow: ${props => (props.error ? "none" : "0rem 2rem 5rem var(--shadow-color-dark)")};
`;

const ImgLoading = styled.div`
  width: 100%;
  max-width: 40%;
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  @media ${props => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
`;

const RatingsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const RatingNumber = styled.p`
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 700;
  color: var(--color-primary);
  margin-left: 5px;
`;

const Info = styled.div`
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-primary-lighter);
  font-size: 1.3rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 3rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftButtons = styled.div`
  margin-right: auto;
  display: flex;
  @media ${props => props.theme.mediaQueries.small} {
    margin-bottom: 2rem;
  }
  & > *:not(:last-child) {
    margin-right: 2rem;
    @media ${props => props.theme.mediaQueries.large} {
      margin-right: 1rem;
    }
  }
`;

const Movie = () => {
  const { slug } = useParams();
  const location = useLocation();
  const ploc = queryString.parse(location.search);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStore();

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true
    });
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    movdb.get(`/movie/${slug}${api_key}`).then(res => {
      dispatch({
        type: "FETCH_SINGLE_MOVIE",
        payload: res.data
      });
    });
    getRecommended(slug, api_key, ploc);
  }, [slug]);

  useEffect(() => {
    getRecommended(slug, api_key, ploc);
  }, [ploc.page]);

  function getRecommended(slug, api_key, ploc) {
    movdb
      .get(`/movie/${slug}/recommendations${api_key}`, {
        params: { page: ploc.page }
      })
      .then(res => {
        dispatch({
          type: "FETCH_SIMILAR_MOVIES",
          payload: res.data
        });
        setLoading(false);
      });
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <LazyLoad height={500}>
          <MovieWrapper>
            <ImageWrapper>
              <MovieImg
                error={error ? 1 : 0}
                src={`https://image.tmdb.org/t/p/w342/${state.movie.poster_path}`}
                onError={e => {
                  setError(true);
                  if (
                    e.target.src !== "https://webitrs5.net/images/comingsoon-square.png" //need better error image
                  ) {
                    e.target.src = "https://webitrs5.net/images/comingsoon-square.png";
                  }
                }}
              />
            </ImageWrapper>
            <MovieDetails>
              <HeaderWrapper>
                <Header size="2" title={state.movie.title} subtitle={state.movie.tagline} />
              </HeaderWrapper>
              <DetailsWrapper>
                <RatingsWrapper>
                  <Rating number={state.movie.vote_average} />
                </RatingsWrapper>
                <Info>{renderInfo(state.movie.spoken_languages, state.movie.runtime, state.movie.release_date)}</Info>
              </DetailsWrapper>
              <Heading>Genres</Heading>
              <LinksWrapper>{renderGenres(state.movie.genres)}</LinksWrapper>
              <Heading>The Synopsis</Heading>
              <Text>
                {state.movie.overview ? state.movie.overview : "There is no description available for this movie."}
              </Text>
            </MovieDetails>
          </MovieWrapper>
        </LazyLoad>
        <Header title="Similar" subtitle="movies" />
        {renderRecommended(state.similar, loading)}
      </Wrapper>
    );
  }
};
function renderInfo(languages, time, data) {
  const info = [];
  if (languages.length !== 0) {
    info.push(languages[0].name);
  }
  info.push(time, data);
  return info
    .filter(el => el !== null)
    .map(el => (typeof el === "number" ? `${el} min.` : el))
    .map((el, i, array) => (i !== array.length - 1 ? `${el} / ` : el));
}

function renderRecommended(similar, loading) {
  if (loading) {
    return <Loader />;
  } else if (similar.total_results === 0) {
    return <h2>Sorry, no recomended movies</h2>;
  } else {
    return (
      <Element name="scroll-to-element">
        <FilmItem film={similar} />{" "}
      </Element>
    );
  }
}

function renderGenres(genres) {
  return genres.map(gen => (
    <StyledLink to={`/genres/${gen.name}`} key={gen.id}>
      <FontAwesomeIcon icon="dot-circle" size="1x" style={{ marginRight: "5px" }} />
      {gen.name}
    </StyledLink>
  ));
}
export default Movie;
