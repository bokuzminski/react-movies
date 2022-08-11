import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "src/components/Header";
import { Rating } from "src/components/Rating";
import { Genre } from "src/redux/genres";
import { DetailedMovie } from "src/redux/movdbModel";
import { useFeetchMovieByIdQuery } from "src/redux/movies";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const InteriorWrapper = styled.div`
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

const BogMater = styled.div`
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

const MovieImg = styled.img<{ error: boolean }>`
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

export const DetailedMovieView = () => {
  const { movieId } = useParams<{ movieId: string }>();
  /* const { slug } = useParams();
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
 */

  const { data, isLoading, error } = useFeetchMovieByIdQuery(movieId!);
  if (isLoading) return <h1>Loading....</h1>;
  if (!data) return <h1>no data</h1>;
  return (
    <Wrapper>
      <InteriorWrapper>
        <ImageWrapper>
          <MovieImg error={!!error} src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`} />
        </ImageWrapper>
        <BogMater>
          <HeaderWrapper>
            <Header size="2" title={data.title} subtitle={data.tagline} />
          </HeaderWrapper>
          <DetailsWrapper>
            <RatingsWrapper>{<Rating number={data.vote_average} />}</RatingsWrapper>
            <Info>
              {renderInfo({
                languages: data.spoken_languages,
                time: data.runtime,
                date: data.release_date
              })}
            </Info>
          </DetailsWrapper>
          <Heading>Genres</Heading>
          <LinksWrapper>{renderGenres(data.genres)}</LinksWrapper>
          <Heading>The Synopsis</Heading>
          <Text>{data.overview ? data.overview : "There is no description available for this movie."}</Text>
        </BogMater>
      </InteriorWrapper>
      <Header title="Similar" subtitle="movies" />
      {/* {renderRecommended(state.similar, loading)}  */}
    </Wrapper>
  );
};

function renderInfo({
  date,
  time,
  languages
}: {
  date: DetailedMovie["release_date"];
  time: DetailedMovie["runtime"];
  languages: DetailedMovie["spoken_languages"];
}): JSX.Element {
  const info = [];
  if (languages.length !== 0) {
    info.push(languages[0].name);
  }
  info.push(time, date);
  return info
    .filter(el => el !== null)
    .map(el => (typeof el === "number" ? `${el} min.` : el))
    .map((el, i, array) => (i !== array.length - 1 ? `${el} / ` : el));
}
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
function renderGenres(genres: Genre[]) {
  return genres.map(genre => (
    <StyledLink to={`/genre/${genre.name}`} key={genre.id}>
      <FontAwesomeIcon icon="dot-circle" size="1x" style={{ marginRight: "5px" }} />
      {genre.name}
    </StyledLink>
  ));
}
