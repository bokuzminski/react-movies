import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailedMovieView } from "src/components/detailedMovieView/DetailedMovieView";
import { MoviesByGenre } from "src/components/moviesByGenre/MoviesByGenre";
import { PopularMovies } from "src/components/popularMovies/PopularMovies";
import { SearchMovies } from "src/components/searchMovies/SearchMovies";
import { SideBarMenu } from "src/components/sideBar/SideBarMenu";

export const App = () => {
  const [isMobile, setisMobile] = useState(false);
  const drawerWidth = 270;

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }
          }}
        >
          <SideBarMenu />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<PopularMovies />} />
            <Route path="/:movieId" element={<DetailedMovieView />} />
            <Route path="/genre/:genreId/:genreName" element={<MoviesByGenre />} />
            <Route path="/search/:query" element={<SearchMovies />} />
          </Routes>
        </Box>
      </Box>
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
