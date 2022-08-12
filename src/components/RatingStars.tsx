import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Rating from "react-rating";
import styled from "styled-components";

const StarsWrapper = styled(Rating)`
  line-height: 1;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  color: inherit;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 10px;
  @media ${props => props.theme.mediaQueries.smaller} {
    margin-right: 5px;
  }
`;

export const RatingStars = ({ number }: RatingProps) => {
  return (
    <StarsWrapper
      emptySymbol={<FontAwesome icon={["far", "star"]} size="lg" />}
      fullSymbol={<FontAwesome icon={["fas", "star"]} size="lg" />}
      initialRating={number / 2}
      readonly
    />
  );
};

type RatingProps = {
  number: number;
};
