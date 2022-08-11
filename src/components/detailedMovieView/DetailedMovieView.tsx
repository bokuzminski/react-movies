import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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
import { Loader } from "src/components/Loader";
import { Rating } from "src/components/Rating";
import { DetailedMovie } from "src/redux/movdbModel";
import { useFeetchMovieByIdQuery } from "src/redux/movies";
import missingImg from "src/style/imageMissing.png";

export const DetailedMovieView = () => {
  const { movieId = "" } = useParams<{ movieId: string }>();
  const { data, isLoading, error } = useFeetchMovieByIdQuery(movieId);
  const imageSource = data?.poster_path ? `https://image.tmdb.org/t/p/w342/${data.poster_path}` : missingImg;
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
            <RatingsWrapper>{<Rating number={data.vote_average} />}</RatingsWrapper>
            <Info>
              <LanguageAndDurationInfo date={data.release_date} time={data.runtime} languages={data.spoken_languages} />
            </Info>
          </DetailsWrapper>
          <Heading>Genres</Heading>
          <LinksWrapper>
            <MovieGenreCategories genres={data.genres} />
          </LinksWrapper>
          <Heading>The Synopsis</Heading>
          <OverviewText>{data.overview || "There is no description available for this movie."}</OverviewText>
        </ContentWrapper>
      </InteriorWrapper>
      <Header title="Similar" subtitle="movies" />
      {/* {renderRecommended(state.similar, loading)}  */}
    </DetailedMovieViewWrapper>
  );
};

const LanguageAndDurationInfo = ({
  date,
  time,
  languages
}: {
  date: DetailedMovie["release_date"];
  time: DetailedMovie["runtime"];
  languages: DetailedMovie["spoken_languages"];
}) => {
  const mainSpokenLanguage = languages[0].name;
  const languageAndDuration = `${mainSpokenLanguage} / ${time} min / ${date}`;

  return <p>{languageAndDuration}</p>;
};

const MovieGenreCategories = ({ genres }: { genres: DetailedMovie["genres"] }) => {
  return (
    <>
      {genres.map(genre => (
        <StyledLink to={`/genre/${genre.name}`} key={genre.id}>
          <FontAwesomeIcon icon="dot-circle" size="1x" style={{ marginRight: "5px" }} />
          {genre.name}
        </StyledLink>
      ))}
    </>
  );
};

/*
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
*/
