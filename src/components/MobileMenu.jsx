import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { slide as Menu } from 'react-burger-menu';
import SearchBar from './SearchBar';
import MenuItem from './MenuItem';
import LogoImg from './Logo';
import Loading from './Loading';

const WrapperStickyBox = styled(StickyBox)`
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: white;
  box-shadow: 0 2px 40px var(--shadow-color);
`;

const Hamburger = styled.div`
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: space-around;
  width: 25px;
  line-height: 1;
  height: auto;
  background-color: transparent;
  cursor: pointer;
`;

const Bar = styled.span`
  transition: all 0.3s;
  border-radius: 10px;
  margin: 2px 0;
  height: 4px;
  width: 100%;
  display: inline-block;
  background-color: var(--color-primary);
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
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

let styles = {
  bmBurgerButton: {
    display: 'none',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    marginRight: '1rem',
  },
  bmCross: {
    background: '#fafafa',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: 0,
    left: 0,
  },
  bmMenu: {
    background: '#f4f6f5',
    overflowY: 'scroll',
    padding: '2.5em 1.5em',
  },
  bmItemList: {
    color: '#fafafa',
    padding: '0.8rem',
  },
  bmItem: {
    outline: 'none',
  },
  bmOverlay: {
    top: 0,
    background: 'rgba(0, 0, 0, 0.3)',
  },
};
const MobileMenu = ({ genres }) => {
  const [isOpen, setisOpen] = useState(false);

  const isMenuOpen = ({ isOpen }) => {
    setisOpen(isOpen);
  };
  return (
    <>
      <WrapperStickyBox>
        <Hamburger onClick={() => setisOpen(true)}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
        <SearchBar />
      </WrapperStickyBox>
      <Menu isOpen={isOpen} onStateChange={isMenuOpen} styles={styles}>
        <LogoImg />
        <Heading>Genres</Heading>
        {!genres ? <Loading /> : renderGenres(genres)}
      </Menu>
    </>
  );
};
function renderGenres(genres, setisOpen) {
  return genres.map((genre) => (
    <LinkWrap
      to={`/genres/${genre.name}`}
      key={genre.id}
      onClick={setisOpen ? () => setisOpen(false) : null}
    >
      <MenuItem mobile={setisOpen ? 1 : 0} title={genre.name} />
    </LinkWrap>
  ));
}
export default MobileMenu;
