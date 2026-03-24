import { ImageOff } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieById } from "@/api/hooks";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { ExternalConnections } from "@/components/detailedMovieView/components/externalConnections/ExternalConnections";
import { MovieGenreCategories } from "@/components/detailedMovieView/components/MovieGenreCategories";
import { VoteAverageStars } from "@/components/detailedMovieView/components/VoteAverageStars";
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
              <img src={imageSource} alt={data.title} className="aspect-[2/3] w-full max-w-[342px] object-cover" />
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
              {data.production_companies.splice(0, 4).map(company => (
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
      <section className="max-w-2xl space-y-4 overflow-hidden">
        <h2 className="text-lg font-medium text-foreground">Cast</h2>
        <Carousel opts={{ align: "start", loop: false }} className="max-w-2xl">
          <CarouselContent className="-ml-4">
            {data.credits.cast.slice(0, 14).map(actor => (
              <CarouselItem key={actor.id} className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card className="flex overflow-hidden p-0">
                  <div className="flex w-full gap-3 p-3">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w45/${actor.profile_path}`}
                        alt={actor.name}
                        className="h-16 w-12 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded bg-muted">
                        <ImageOff className="size-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="truncate text-sm font-medium text-foreground">{actor.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{actor.character}</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2" />
          <CarouselNext className="-right-2" />
        </Carousel>
      </section>
    </div>
  );
};

function scrollToTopWhenNewMovieLoads() {
  window.scrollTo(0, 0);
}
