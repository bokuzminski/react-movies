import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MovieList } from "src/components/movieList/MovieList";
import { Sidebar } from "src/components/sideBar";
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
  const [isMobile, setisMobile] = useState<boolean>(false);

  useEffect(resizeWindowIfOnMobile, []);

  return (
    <BrowserRouter>
      <MainWrapper isMobile={isMobile}>
        {/*   {isMobile ? (
          <MobileMenu genres={state.genres.genres} />
        ) : (
          <>
            <Sidebar />
            <SearchBarWrapper>
              <SearchBar />
            </SearchBarWrapper>
          </>
        )} */}
        <Sidebar />
        <ContentWrapper>
          <MovieList />
          {/*  <Route path="/" element={<App />} />
          <Route path="/react-movies" element={<Discover />} />
          <Route path="/genres/:genre" element={<Genre />} />
          <Route path="/:filmid" element={<FilmInfo />} />
          <Route path="/search/:query" element={<Search />} /> */}
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
/*
function App() {
  const [isMobile, setisMobile] = useState(null);
  const [state, dispatch] = useStore();

  const changeMobile = () => {
    window.matchMedia("(max-width: 80em)").matches ? setisMobile(true) : setisMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", changeMobile);
    return () => window.removeEventListener("resize", changeMobile);
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES_LOADING" });
    movdb.get(`/genre/movie/list${api_key}`).then(response => {
      dispatch({
        type: "FETCH_GENRES",
        payload: response.data
      });
    });
    dispatch({ type: "FINISHED_FETCHING_GENRES" });
  }, []);

  console.log(data);
  return (
    <Router>
      <MainWrapper isMobile={isMobile}>
        {isMobile ? (
          <MobileMenu genres={state.genres.genres} />
        ) : (
          <>
            <Sidebar />
            <SearchBarWrapper>
              <SearchBar />
            </SearchBarWrapper>
          </>
        )}
        <ContentWrapper>
          <Switch>
            <Route path="/" exact render={() => <Redirect from="/" to="/react-movies" />} />
            <Route path="/react-movies" exact component={Discover} />
            <Route path="/genres/:gen" exact component={Genre} />
            <Route path="/:slug" exact component={FilmInfo} />
            <Route path="/search/:query" exact component={Search} />
          </Switch>
        </ContentWrapper>
      </MainWrapper>
    </Router>
  );
}*/
