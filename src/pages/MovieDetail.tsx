import { ImageOff } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieById } from "@/api/hooks";
import { CastMember } from "@/components/movieDetail/Cast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { ExternalConnections } from "@/components/movieDetail/ExternalConnections";
import { MovieGenreCategories } from "@/components/movieDetail/MovieGenreCategories";
import { VoteAverageStars } from "@/components/movieDetail/VoteAverageStars";
import { Loader } from "@/components/loader/Loader";

export const DetailedMovieView = () => {
  const { movieId = "" } = useParams<{ movieId: string }>();
  useEffect(scrollToTopWhenNewMovieLoads, [movieId]);
  const { data, isFetching } = useFetchMovieById(movieId);

  if (isFetching) return <Loader />;
  if (!data) return <h1>no data</h1>;
  const imageSource = data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : null;
  const backdropUrl = data.backdrop_path ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}` : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="relative overflow-hidden rounded-lg">
        {backdropUrl && (
          <>
            <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[3px] scale-105"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            />
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 40%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0.12) 100%)"
              }}
            />
          </>
        )}
        <div className={`relative z-10 flex flex-col gap-6 p-6 sm:flex-row ${backdropUrl ? "text-white" : ""}`}>
          {/* Poster image */}
          <Card className="h-fit shrink-0 overflow-hidden p-0">
            {imageSource ? (
              <img
                loading="lazy"
                decoding="async"
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
            <h1 className="text-4xl font-light uppercase tracking-tight leading-tight sm:text-5xl">{data.title}</h1>

            {/* Tagline */}
            {data.tagline && (
              <p
                className={`text-xl font-semibold uppercase tracking-wide ${
                  backdropUrl ? "text-white/60" : "text-muted-foreground"
                }`}
              >
                {data.tagline}
              </p>
            )}

            {/* Subtitle / metadata */}
            <p className={`text-sm ${backdropUrl ? "text-white/80" : "text-muted-foreground"}`}>
              {new Date(data.release_date).toLocaleDateString()} ·{" "}
              {Array.isArray(data.origin_country) ? data.origin_country.join(", ") : data.origin_country} ·{" "}
              {data.original_language.toUpperCase()} · {data.runtime} min
            </p>

            <div className="flex items-center gap-2">
              <VoteAverageStars voteAverage={data.vote_average} onDarkBackdrop={!!backdropUrl} />
              <span className="text-sm font-medium">{Number(data.vote_average).toFixed(1)}</span>
            </div>

            <MovieGenreCategories genres={data.genres} inverted={!!backdropUrl} />

            {/* Overview */}
            <section className="space-y-2">
              <h2 className="text-lg font-medium">Overview</h2>
              <p className={`max-w-2xl leading-relaxed ${backdropUrl ? "text-white/90" : "text-muted-foreground"}`}>
                {data.overview}
              </p>
            </section>

            <div className="flex flex-wrap items-start gap-6">
              {data.production_companies.slice(0, 4).map(company => (
                <div key={company.id} className="flex flex-col items-center gap-2">
                  <div className="flex h-8 w-20 shrink-0 items-center justify-center">
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92/${company.logo_path}`}
                        alt={company.name}
                        className="max-h-8 max-w-20 object-contain"
                      />
                    ) : (
                      <ImageOff className={`size-4 ${backdropUrl ? "text-white/60" : "text-muted-foreground"}`} />
                    )}
                  </div>
                  <span
                    className={`max-w-20 text-center text-xs leading-tight ${
                      backdropUrl ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
            <div
              className={
                backdropUrl
                  ? "[&_button]:border-white/60 [&_button]:bg-transparent [&_button]:text-white [&_button:hover]:bg-white/10"
                  : ""
              }
            >
              <ExternalConnections homepage={data.homepage} data={data.external_ids} />
            </div>
          </div>
        </div>
      </div>
      <section>
        <h2 className="text-lg font-medium text-foreground">Top Cast</h2>
        <Carousel
          opts={{ align: "start", loop: false, direction: "ltr" }}
          className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
        >
          <CarouselContent className="-ml-1">
            {data.credits.cast.slice(0, 14).map(actor => (
              <CarouselItem key={actor.id} className="basis-1/2 pl-1 lg:basis-1/4">
                <CastMember name={actor.name} character={actor.character} profilePath={actor.profile_path} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
};

function scrollToTopWhenNewMovieLoads() {
  window.scrollTo(0, 0);
}
