import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Loading";

const MovieWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: transparent;
  border-radius: 0.8rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  &:hover {
    transform: scale(1.03);
  }
`;

const MovieImg = styled.img`
  width: 100%;
  height: 38rem;
  object-fit: cover;
  border-radius: 0.8rem;
  padding: 2rem;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  ${MovieWrapper}:hover & {
    border-radius: 0.8rem 0.8rem 0rem 0rem;
    box-shadow: none;
  }
  @media ${props => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const ImgLoading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  border-radius: 0.8rem;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-primary-light);
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  @media ${props => props.theme.mediaQueries.smaller} {
    padding: 1.5rem 1.5rem;
  }
`;

const RatingsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
  ${MovieWrapper}:hover & {
    color: var(--color-primary-lighter);
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 120px;
  font-weight: 500;
  font-size: 1.1rem;
  background-color: var(--color-primary-light);
  color: var(--text-color);
  text-align: center;
  border-radius: 6px;
  padding: 1rem;
  position: absolute;
  z-index: 999;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
    border-color: var(--color-primary-light) transparent transparent transparent;
  }
  ${RatingsWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

export const MovieListItem = ({ id, poster_path, title }: MovieListItemProps) => {
  const [loaded, setloaded] = useState(false);

  return (
    <MovieWrapper to={`/${id}`}>
      {!loaded ? (
        <ImgLoading>
          <Loading />
        </ImgLoading>
      ) : null}
      <MovieImg
        onLoad={() => setloaded(true)}
        style={!loaded ? { display: "none" } : {}}
        src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
      />
      <DetailsWrapper>
        <Title>{title}</Title>
      </DetailsWrapper>
    </MovieWrapper>
  );
};

type MovieListItemProps = {
  id: number;
  title: string;
  poster_path: string;
};
