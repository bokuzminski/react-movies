import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const MovieListItem = ({ id, poster_path, title }: MovieListItemProps) => {
  return (
    <Box
      sx={{
        transition: "transform 0.3s",
        maxWidth: 342,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        gap: 2,
        "&:hover": {
          transform: "scale(1.05)",
          backgroundColor: "rgba(211, 211, 211, 0.5)"
        }
      }}
    >
      <Box
        component="img"
        src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
        alt={title}
        sx={{ borderRadius: 3, objectFit: "cover" }}
      />

      <Typography
        width={"100%"}
        whiteSpace={"normal"}
        textAlign={"center"}
        fontFamily={"Proza libre, sans-serif"}
        fontSize={"22px"}
      >
        {title}
      </Typography>
    </Box>
  );
};

type MovieListItemProps = {
  id: number;
  title: string;
  poster_path: string;
};
