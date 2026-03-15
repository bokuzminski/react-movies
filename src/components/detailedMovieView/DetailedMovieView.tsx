import { Box, Paper, Rating, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieById } from "@/api/hooks";
import { Card } from "@/components/ui/card";
import { ExternalConnections } from "@/components/detailedMovieView/components/externalConnections/ExternalConnections";
import { MovieGenreCategories } from "@/components/detailedMovieView/components/MovieGenreCategories";
import { Loader } from "@/components/loader/Loader";

export const DetailedMovieView = () => {
  const { movieId = "" } = useParams<{ movieId: string }>();
  useEffect(scrollToTopWhenNewMovieLoads, [movieId]);
  const { data, isFetching } = useFetchMovieById(movieId);

  if (isFetching) return <Loader />;
  if (!data) return <h1>no data</h1>;
  const imageSource = data.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Poster image */}
        <Card className="h-fit shrink-0 overflow-hidden">
          {imageSource ? (
            <img
              src={imageSource}
              alt={data.title}
              className="aspect-[2/3] w-full max-w-[342px] object-cover"
            />
          ) : (
            <div className="flex aspect-[2/3] w-full max-w-[342px] items-center justify-center bg-muted">
              <span className="text-4xl text-muted-foreground">🎬</span>
            </div>
          )}
        </Card>

        <div className="flex flex-1 flex-col gap-4">
          {/* Title */}
          <h1 className="text-4xl font-light uppercase tracking-tight leading-tight text-foreground sm:text-5xl">
            {data.title}
          </h1>

          {/* Tagline */}
          {data.tagline && (
            <p className="text-xl font-semibold uppercase tracking-wide text-muted-foreground">
              {data.tagline}
            </p>
          )}

          {/* Subtitle / metadata */}
          <p className="text-sm text-muted-foreground">
            {new Date(data.release_date).toLocaleDateString()} ·{" "}
            {Array.isArray(data.origin_country) ? data.origin_country.join(", ") : data.origin_country} ·{" "}
            {data.original_language.toUpperCase()} · {data.runtime} min
          </p>

          <div className="flex items-center gap-2">
            <Rating
              size="small"
              sx={{ color: "black", "& .MuiRating-icon": { fontSize: "1.25rem" } }}
              readOnly
              value={data.vote_average / 2}
              max={5}
              precision={0.5}
            />
            <span className="text-sm font-medium text-foreground">
              {Number(data.vote_average).toFixed(1)}
            </span>
          </div>

          <MovieGenreCategories genres={data.genres} />

          {/* Overview */}
          <section className="space-y-2">
            <h2 className="text-lg font-medium text-foreground">Overview</h2>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">{data.overview}</p>
          </section>

          <Stack direction={"row"} alignItems={"stretch"} useFlexGap gap={4}>
            {data.production_companies.splice(0, 4).map(company => {
              return (
                <Stack key={company.id} direction={"column"} justifyContent={"space-between"} alignItems={"center"}>
                  <Box component={"img"} src={`https://image.tmdb.org/t/p/w45/${company.logo_path}`} />
                  <Typography
                    variant="body1"
                    fontFamily={"Proza Libre, sans-serif"}
                    fontWeight={500}
                    color={"GrayText"}
                    lineHeight={1.5}
                    fontSize={"1.2rem"}
                  >
                    {company.name}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
          <ExternalConnections homepage={data.homepage} data={data.external_ids} />
        </div>
      </div>
      <Box display={"flex"} flexDirection={"row"} gap={2} flexWrap={"wrap"}>
        {data.credits.cast.splice(0, 14).map(actor => {
          const avatarImage = actor.profile_path ? (
            <Box
              component={"img"}
              src={`https://image.tmdb.org/t/p/w45/${actor.profile_path}`}
              width={45}
              height={68}
              borderRadius={1}
            />
          ) : (
            <SvgIcon sx={{ height: 68, width: 45 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="532" height="532" viewBox="0 0 532 532">
                <circle cx="270.75986" cy="260.93427" r="86.34897" fill="#ffb6b6" />
                <polygon
                  points="221.18982 360.05209 217.28876 320.6185 295.18982 306.05209 341.18982 418.05209 261.18982 510.05209 204.18982 398.05209 221.18982 360.05209"
                  fill="#ffb6b6"
                />
                <path
                  d="m216.0374,340.35736l17.03111,3.84802s-13.38821-42.45453-8.84396-46.50766c4.54427-4.05316,15.68007,2.33328,15.68007,2.33328l11.70201,13.1199,14.25394-14.51239s15.47495-19.2421,21.53397-24.6463-3.67319-25.46364-3.67319-25.46364c0,0,89.89185-24.23923,56.44299-67.83968,0,0-19.61093-34.18452-25.99734-23.04871-6.38641,11.1358-14.00162-6.55013-14.00162-6.55013l-23.25381,4.42198s-45.89429-27.06042-89.45331,30.82959c-43.55902,57.89003,28.57916,154.01572,28.57916,154.01572h-.00002Z"
                  fill="#2f2e41"
                />
                <path
                  d="m433.16003,472.95001c-47.19,38.26001-105.57001,59.04999-167.16003,59.04999-56.23999,0-109.81-17.33997-154.62-49.47998.08002-.84003.16003-1.66998.23004-2.5,1.19-13,2.25-25.64001,2.94995-36.12,2.71002-40.69,97.64001-67.81,97.64001-67.81,0,0,.42999.42999,1.29004,1.17999,5.23999,4.59998,26.50995,21.27997,63.81,25.94,33.25995,4.15997,44.20996-15.57001,47.51996-25.02002,1-2.88,1.30005-4.81,1.30005-4.81l97.63995,46.10999c6.37,9.10004,8.86005,28.70001,9.35004,50.73004.01996.90997.03998,1.81.04999,2.72998Z"
                  fill="#1976d2"
                />
                <path
                  d="m454.09003,77.91003C403.85004,27.66998,337.05005,0,266,0S128.15002,27.66998,77.91003,77.91003C27.67004,128.15002,0,194.95001,0,266c0,64.85004,23.05005,126.16003,65.29004,174.57001,4.02997,4.63,8.23999,9.14001,12.62,13.52002,1.02997,1.02997,2.07001,2.06,3.12,3.06,2.79999,2.70996,5.65002,5.35999,8.54999,7.92999,1.76001,1.57001,3.54004,3.10999,5.34003,4.62,1.40997,1.19,2.82001,2.35999,4.25,3.51001.02997.02997.04999.04999.07996.07001,3.97003,3.19995,8.01001,6.27997,12.13,9.23999,44.81,32.14001,98.37999,49.47998,154.61998,49.47998,61.59003,0,119.97003-20.78998,167.16003-59.04999,3.84998-3.12,7.62-6.35999,11.32001-9.71002,3.26996-2.95996,6.46997-6.01001,9.60999-9.14996.98999-.98999,1.97998-1.98999,2.95001-3,2.70001-2.78003,5.32001-5.61005,7.88-8.48004,43.37-48.71997,67.07996-110.83997,67.07996-176.60999,0-71.04999-27.66998-137.84998-77.90997-188.08997Zm10.17999,362.20997c-2.5,2.84003-5.06,5.64001-7.67999,8.37-4.08002,4.25-8.28998,8.37-12.64001,12.34003-1.64996,1.52002-3.32001,3-5.01001,4.46997-1.91998,1.67004-3.85999,3.31-5.82996,4.92004-15.53003,12.75-32.54004,23.75-50.73004,32.70996-7.19,3.54999-14.56,6.78003-22.09998,9.67004-29.28998,11.23999-61.08002,17.39996-94.28003,17.39996-32.03998,0-62.75995-5.73999-91.19-16.23999-11.66998-4.29999-22.94995-9.40997-33.77997-15.26001-1.59003-.85999-3.16998-1.72998-4.73999-2.62-8.26001-4.67999-16.25-9.78998-23.91998-15.31-.25-.17999-.51001-.37-.76001-.54999-5.46002-3.94-10.77002-8.09003-15.90002-12.45001-1.88-1.59003-3.73999-3.20001-5.57001-4.84998-2.97998-2.65002-5.89996-5.38-8.75-8.18005-5.39996-5.28998-10.56-10.79999-15.48999-16.52997C26.09003,391.77002,2,331.65002,2,266,2,120.42999,120.43005,2,266,2s264,118.42999,264,264c0,66.66003-24.82996,127.62-65.72998,174.12Z"
                  fill="#3f3d56"
                />
              </svg>
            </SvgIcon>
          );

          return (
            <Paper elevation={3} square key={actor.id}>
              <Box display={"flex"} flexDirection={"row"} width={300} gap={1}>
                {avatarImage}
                <Stack direction={"column"} overflow={"hidden"}>
                  <Typography fontWeight={700} variant="body1" fontFamily={"Proza Libre, sans-serif"}>
                    {actor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"Proza Libre, sans-serif"}
                    fontWeight={500}
                    color={"GrayText"}
                    lineHeight={1.5}
                    noWrap
                  >
                    {actor.character}
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </div>
  );
};

function scrollToTopWhenNewMovieLoads() {
  window.scrollTo(0, 0);
}

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
