import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { Link } from 'react-router-dom';

import MenuItem from './MenuItem';
import LogoImg from './Logo';
import Loader from './Loader';
import { useStore } from '../globalState/moviesState';

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
  font-family: 'Proza Libre', sans-serif;
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

const Sidebar = () => {
  const [state, dispatch] = useStore();

  return (
    <StickyBox>
      <Wrapper>
        <LogoImg />
        <Heading>Genres</Heading>
        {!state.genres.genres ? <Loader /> : renderGenres(state.genres.genres)}
      </Wrapper>
    </StickyBox>
  );
};

function renderGenres(genres) {
  return genres.map((genre) => (
    <LinkWrap to={`/genres/${genre.name}`} key={genre.id}>
      <MenuItem key={genre.id} title={genre.name} />
    </LinkWrap>
  ));
}

export default Sidebar;
