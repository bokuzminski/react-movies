import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Stars from "react-rating";
import styled from "styled-components";

const StarsWrapper = styled(Stars)`
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

export const Rating = ({ number }: RatingProps) => {
  return (
    <StarsWrapper
      emptySymbol={<FontAwesome icon={["far", "star"]} size="lg" />}
      fullSymbol={<FontAwesome icon={["fas", "star"]} size="lg" />}
      initialRating={number}
      stop={10}
      readonly
    />
  );
};

type RatingProps = {
  number: number;
};
