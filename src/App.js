import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

import FilmInfo from './components/FilmInfo';
import Sidebar from './components/sideBar';
import Discover from './components/Discover';
import SearchBar from './components/SearchBar';
import MobileMenu from './components/MobileMenu';
import Search from './components/Search';
import Genre from './components/Genre';
import movdb, { api_key } from './api/movdb';
import { useStore } from './globalState/moviesState';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
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
  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }
  @media ${(props) => props.theme.mediaQueries.large} {
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

function App() {
  const [isMobile, setisMobile] = useState(null);
  const [state, dispatch] = useStore();

  const changeMobile = () => {
    window.matchMedia('(max-width: 80em)').matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener('resize', changeMobile());
    return () => window.removeEventListener('resize', changeMobile());
  }, []);

  useEffect(() => {
    movdb.get(`/genre/movie/list${api_key}`).then((response) => {
      dispatch({
        type: 'FETCH_GENRES',
        payload: response.data,
      });
    });
    dispatch({ type: 'FINISHED_FETCHING_GENRES' });
  }, []);

  /*   function Home() { */
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
            <Route
              path="/"
              exact
              render={() => <Redirect from="/" to="/react-movies" />}
            />
            <Route path="/react-movies" exact component={Discover} />
            <Route path="/genres/:gen" exact component={Genre} />
            <Route path="/:slug" exact component={FilmInfo} />
            <Route path="/search/:query" exact component={Search} />
          </Switch>
        </ContentWrapper>
      </MainWrapper>
    </Router>
  );
}
export default App;
