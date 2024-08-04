import { Circle } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "src/components/loader/Loader";
import { LogoImage } from "src/components/sideBar/logo/Logo";
import { Genre } from "src/redux/movdbModel";
import { useFetchAvailableGenresQuery } from "src/redux/movies";

export const SideBarMenu = () => {
  const { data: genres, isLoading } = useFetchAvailableGenresQuery();

  return (
    <Box display={"flex"} flexDirection={"column"} p={2}>
      <LogoImage />
      <Typography
        fontFamily={"Monserrat, sans-serif"}
        fontWeight={700}
        textTransform={"uppercase"}
        lineHeight={1.2}
        variant="h2"
        sx={{ fontSize: "1.2rem", letterSpacing: "0.8px" }}
      >
        Genres
      </Typography>
      <Divider component="div" orientation="horizontal" />
      {isLoading ? <Loader /> : renderGenres(genres || [])}
    </Box>
  );
};

function renderGenres(genres: Genre[]) {
  return (
    <Box flexGrow={1} overflow={"auto"}>
      <List>
        {genres.map(genre => (
          <ListItem key={genre.id} disablePadding>
            <ListItemButton component={Link} to={`/genre/${genre.id}/${genre.name}`}>
              <ListItemIcon>
                <Circle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={genre.name}
                primaryTypographyProps={{
                  fontWeight: 600,

                  fontSize: "1.2rem",
                  lineHeight: 1,
                  variant: "caption"
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
