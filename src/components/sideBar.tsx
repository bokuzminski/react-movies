import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "src/components/Loader";
import { LogoImage } from "src/components/Logo";
import MenuItem from "src/components/MenuItem";
import { Genre, useFetchAvailableGenresQuery } from "src/redux/genres";
import styled from "styled-components";

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

export const Sidebar = () => {
  const { data: genres, isLoading } = useFetchAvailableGenresQuery();

  return (
    <Wrapper>
      <LogoImage />
      <Heading>Genres</Heading>
      {isLoading ? <Loader /> : renderGenres(genres || [])}
    </Wrapper>
  );
};

function renderGenres(genres: Genre[]) {
  return genres.map(genre => (
    <LinkWrap to={`/genre/${genre.id}`} key={genre.id}>
      <MenuItem title={genre.name} mobile={false} selected={false} />
    </LinkWrap>
  ));
}
