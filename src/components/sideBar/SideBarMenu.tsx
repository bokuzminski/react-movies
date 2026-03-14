import { Circle, Grade, Upcoming, WhatshotOutlined } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Loader } from "src/components/loader/Loader";
import { LogoImage } from "src/components/sideBar/logo/Logo";

import { useFetchGenres } from "../../api/hooks";
import { Genre } from "src/api/types/movDbTypes";

export const SideBarMenu = () => {
  const { data, isFetching } = useFetchGenres();

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
        Discover
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/"}>
            <ListItemIcon>
              <WhatshotOutlined color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={"Popular"}
              primaryTypographyProps={{
                fontWeight: 600,

                fontSize: "1.2rem",
                lineHeight: 1,
                variant: "caption"
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/top_rated"}>
            <ListItemIcon>
              <Grade color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={"Top rated"}
              primaryTypographyProps={{
                fontWeight: 600,

                fontSize: "1.2rem",
                lineHeight: 1,
                variant: "caption"
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/upcoming"}>
            <ListItemIcon>
              <Upcoming color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={"Upcoming"}
              primaryTypographyProps={{
                fontWeight: 600,

                fontSize: "1.2rem",
                lineHeight: 1,
                variant: "caption"
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
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
      {isFetching ? <Loader /> : renderGenres(data || [])}
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
