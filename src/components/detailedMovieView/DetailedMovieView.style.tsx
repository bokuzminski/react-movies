import { Link } from "react-router-dom";
import styled from "styled-components";

export const DetailedMovieViewWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const InteriorWrapper = styled.div`
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

export const StyledLink = styled(Link)`
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

export const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

export const ContentWrapper = styled.div`
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

export const ImageWrapper = styled.div`
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

export const MovieImg = styled.img<{ error: boolean }>`
  max-height: 100%;
  height: ${props => (props.error ? "25rem" : "auto")};
  object-fit: ${props => (props.error ? "contain" : "cover")};
  padding: ${props => (props.error ? "2rem" : "")};
  max-width: 100%;
  border-radius: 0.8rem;
  box-shadow: ${props => (props.error ? "none" : "0rem 2rem 5rem var(--shadow-color-dark)")};
`;

export const ImgLoading = styled.div`
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

export const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
`;

export const RatingsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

export const RatingNumber = styled.p`
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 700;
  color: var(--color-primary);
  margin-left: 5px;
`;

export const Info = styled.div`
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-primary-lighter);
  font-size: 1.3rem;
`;

export const OverviewText = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--link-color);
  font-weight: 500;
  margin-bottom: 3rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LeftButtons = styled.div`
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
