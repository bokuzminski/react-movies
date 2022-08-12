import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailedMovieView } from "src/components/detailedMovieView/DetailedMovieView";
import { Genre } from "src/components/Genre";
import MobileMenu from "src/components/MobileMenu";
import { PopularMovies } from "src/components/popularMovies/PopularMovies";
import { SearchBar } from "src/components/searchMovies/searchBar/SearchBar";
import { SearchMovies } from "src/components/searchMovies/SearchMovies";
import { SideBarMenu } from "src/components/sideBar/SideBarMenu";
import styled from "styled-components";

const MainWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${props => (props.isMobile ? "column" : "row")};
  position: relative;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;
  @media ${props => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }
  @media ${props => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 2rem;
  width: 100%;
`;

export const App = () => {
  const [isMobile, setisMobile] = useState(false);

  useEffect(resizeWindowIfOnMobile, []);

  return (
    <BrowserRouter>
      <MainWrapper isMobile={isMobile}>
        {isMobile ? (
          <MobileMenu />
        ) : (
          <>
            <SideBarMenu />
            <SearchBarWrapper>
              <SearchBar />
            </SearchBarWrapper>
          </>
        )}
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<PopularMovies />} />
            <Route path="/:movieId" element={<DetailedMovieView />} />
            <Route path="/genre/:genre" element={<Genre />} />
            <Route path="/search/:query" element={<SearchMovies />} />
          </Routes>
        </ContentWrapper>
      </MainWrapper>
    </BrowserRouter>
  );

  function resizeWindowIfOnMobile() {
    window.addEventListener("resize", changeMobile);

    return () => window.removeEventListener("resize", changeMobile);
  }
  function changeMobile() {
    window.matchMedia("(max-width: 80em)").matches ? setisMobile(true) : setisMobile(false);
  }
};
