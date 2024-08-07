import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailedMovieView } from "src/components/detailedMovieView/DetailedMovieView";
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
            <Route path="/:movieId" element={<DetailedMovieView />} />
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
