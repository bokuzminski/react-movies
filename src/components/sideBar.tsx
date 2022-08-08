import React from "react";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import styled from "styled-components";
import Loader from "./Loader";
import LogoImg from "./Logo";
import MenuItem from "./MenuItem";
import { Genre, useFetchAvailableGenresQuery } from "./redux/genres";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  margin-top: 4rem;
  color: var(--color-primary-dark);
  border-right: 1px solid #953433;
`;

const Heading = styled.h2`
  font-family: "Proza Libre", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
`;

export const Sidebar: React.FunctionComponent = () => {
  const { isLoading, data: genres } = useFetchAvailableGenresQuery();

  return (
    <StickyBox>
      <Wrapper>
        <LogoImg />
        <Heading>Genres</Heading>
        {isLoading ? <Loader /> : renderGenres(genres || [])}
      </Wrapper>
    </StickyBox>
  );
};

function renderGenres(genres: Genre[]) {
  return genres.map(genre => (
    <LinkWrap to={`/genres/${genre.name}`} key={genre.id}>
      <MenuItem title={genre.name} />
    </LinkWrap>
  ));
}
