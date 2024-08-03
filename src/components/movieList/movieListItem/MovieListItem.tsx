import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const MovieListItem = ({ id, poster_path, title }: MovieListItemProps) => {
  return (
    <Card
      component={Link}
      to={`/${id}`}
      sx={{
        textDecoration: "none",
        borderRadius: 1,
        overflow: "hidden",
        "&:hover": {
          boxShadow: 3
        }
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w342/${poster_path}`}
          alt={title}
          sx={{
            width: "100%",
            display: "block",
            borderRadius: 3
          }}
        />
        <CardContent
          sx={{
            textAlign: "center",
            padding: 3
          }}
        >
          <Typography variant="h4" component="h4">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

type MovieListItemProps = {
  id: number;
  title: string;
  poster_path: string;
};
