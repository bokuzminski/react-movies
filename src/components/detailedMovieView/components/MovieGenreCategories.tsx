import { Circle } from "@mui/icons-material";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DetailedMovie } from "src/api/types/movDbTypes";

export const MovieGenreCategories = ({ genres }: { genres: DetailedMovie["genres"] }) => {
  return (
    <Stack direction={"column"}>
      <Breadcrumbs separator={<Circle fontSize="small" />} aria-label="breadcrumb">
        {genres.map(genre => (
          <Link key={genre.id} to={`/genre/${genre.id}/${genre.name}`} style={{ textDecoration: "none" }}>
            <Typography fontFamily={"Roboto"} textTransform={"uppercase"} fontWeight={700} fontSize={"1rem"}>
              {genre.name}
            </Typography>
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};
