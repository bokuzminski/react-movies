import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ContentWrapper,
  DetailedMovieViewWrapper,
  DetailsWrapper,
  HeaderWrapper,
  Heading,
  ImageWrapper,
  Info,
  InteriorWrapper,
  LinksWrapper,
  MovieImg,
  OverviewText,
  RatingsWrapper,
  StyledLink
} from "src/components/detailedMovieView/DetailedMovieView.style";
import { Header } from "src/components/Header";
import { Loader } from "src/components/loader/Loader";
import { MovieList } from "src/components/movieList/MovieList";
import { RatingStars } from "src/components/RatingStars";
import { DetailedMovie, Movie } from "src/redux/movdbModel";
import { useFeetchMovieByIdQuery, useFetchSimilarMoviesQuery } from "src/redux/movies";
import missingImg from "src/style/imageMissing.png";

export const DetailedMovieView = () => {
  const { movieId = "" } = useParams<{ movieId: string }>();
  const { data, isLoading, error } = useFeetchMovieByIdQuery(movieId);
  const imageSource = data?.poster_path ? `https://image.tmdb.org/t/p/w342/${data.poster_path}` : missingImg;

  useEffect(scrollToTopWhenNewMovieLoads, [movieId]);

  if (isLoading) return <Loader />;
  if (!data) return <h1>no data</h1>;

  return (
    <DetailedMovieViewWrapper>
      <InteriorWrapper>
        <ImageWrapper>
          <MovieImg error={!!error} src={imageSource} />
        </ImageWrapper>
        <ContentWrapper>
          <HeaderWrapper>
            <Header size="2" title={data.title} subtitle={data.tagline} />
          </HeaderWrapper>
          <DetailsWrapper>
            <RatingsWrapper>{<RatingStars number={data.vote_average} />}</RatingsWrapper>
            <Info>
              <LanguageAndDurationInfo
                date={data.release_date}
                time={data.runtime}
                languages={data.original_language}
              />
            </Info>
          </DetailsWrapper>
          <Heading>Genres</Heading>
          <LinksWrapper>
            <MovieGenreCategories genres={data.genres} />
          </LinksWrapper>
          {/* <Heading>The Synopsis</Heading>  might be worth removing*/}
          <OverviewText>{data.overview || "There is no description available for this movie."}</OverviewText>
        </ContentWrapper>
      </InteriorWrapper>
      <Header title="Similar" subtitle="movies" />
      <SimilarMovies movieId={data.id} />
    </DetailedMovieViewWrapper>
  );
};

function scrollToTopWhenNewMovieLoads() {
  window.scrollTo(0, 0);
}

const LanguageAndDurationInfo = ({
  date,
  time,
  languages
}: {
  date: DetailedMovie["release_date"];
  time: DetailedMovie["runtime"];
  languages: DetailedMovie["original_language"];
}) => {
  const mainSpokenLanguage = languages.toUpperCase();
  const languageAndDuration = `${mainSpokenLanguage} / ${time} min / ${date}`;

  return <p>{languageAndDuration}</p>;
};

const MovieGenreCategories = ({ genres }: { genres: DetailedMovie["genres"] }) => {
  return (
    <>
      {genres.map(genre => (
        <StyledLink to={`/genre/${genre.id}/${genre.name}`} key={genre.id}>
          <FontAwesomeIcon icon="dot-circle" size="1x" style={{ marginRight: "5px" }} />
          {genre.name}
        </StyledLink>
      ))}
    </>
  );
};

const SimilarMovies = ({ movieId }: { movieId: Movie["id"] }) => {
  const { data = [], isLoading } = useFetchSimilarMoviesQuery(movieId);

  return <MovieList movies={data} isLoading={isLoading} />;
};
