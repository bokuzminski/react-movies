import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Circle } from "@mui/icons-material";
import { Box, Breadcrumbs, Divider, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieGenreCategories } from "src/components/detailedMovieView/components/MovieGenreCategories";
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
  StyledLink
} from "src/components/detailedMovieView/DetailedMovieView.style";
import { Header } from "src/components/Header";
import { Loader } from "src/components/loader/Loader";
import { MovieList } from "src/components/movieList/MovieList";
import { DetailedMovie, Movie } from "src/redux/movdbModel";
import { useFeetchMovieByIdQuery, useFetchSimilarMoviesQuery } from "src/redux/movies";

export const DetailedMovieView = () => {
  const { movieId = "" } = useParams<{ movieId: string }>();
  const { data, isLoading, error } = useFeetchMovieByIdQuery(movieId);
  const imageSource = `https://image.tmdb.org/t/p/w500/${data?.poster_path}`;
  const backdrop = data?.backdrop_path;
  useEffect(scrollToTopWhenNewMovieLoads, [movieId]);

  if (isLoading) return <Loader />;
  if (!data) return <h1>no data</h1>;

  return (
    <Box display={"flex"} flexDirection={"row"} position={"relative"} gap={4}>
      {/*  <Box
        component={"div"}
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(https://media.themoviedb.org/t/p/w1280/${backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1
        }}
      /> */}
      <Box component={"img"} src={imageSource} />
      <Stack direction={"column"} gap={3}>
        <Stack direction={"column"}>
          <Typography
            fontFamily={"Montserrat, sans-serif"}
            variant="h1"
            fontWeight={200}
            fontSize={"4rem"}
            textTransform={"uppercase"}
            letterSpacing={-0.5}
            lineHeight={1.2}
          >
            {data.title}
          </Typography>
          <Typography
            variant="h2"
            fontFamily={"Proza Libre, sans-serif"}
            fontWeight={700}
            fontSize={"2rem"}
            color={"GrayText"}
            textTransform={"uppercase"}
            lineHeight={1.5}
          >
            {data.tagline}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Rating
            size="large"
            sx={{ color: "black" }}
            readOnly
            defaultValue={data.vote_average}
            max={10}
            precision={0.5}
          />
          <Typography fontSize={"1.2rem"}>{Number(data.vote_average).toFixed(1)}</Typography>
        </Stack>
        <MovieGenreCategories genres={data.genres} />
        <Stack direction={"column"}>
          <Typography fontFamily={"Roboto"} fontWeight={400} fontSize={"1.5rem"}>
            Overview
          </Typography>
          <Typography
            variant="body1"
            fontFamily={"Proza Libre"}
            fontWeight={400}
            color={"GrayText"}
            lineHeight={1.5}
            fontSize={"2rem"}
            maxWidth={"60%"}
            pl={1}
          >
            {data.overview}
            <Divider variant="fullWidth" />
          </Typography>
        </Stack>
      </Stack>
    </Box>
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

const SimilarMovies = ({ movieId }: { movieId: Movie["id"] }) => {
  const { data = [], isLoading } = useFetchSimilarMoviesQuery(movieId);

  return <MovieList movies={data} isLoading={isLoading} />;
};
{
  /* <Box
component={"div"}
sx={{
  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(https://media.themoviedb.org/t/p/original/${backdrop})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1
}}
/> */
}
