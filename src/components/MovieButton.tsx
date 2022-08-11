import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ left: boolean; solid: boolean }>`
  display: flex;
  flex-direction: ${props => (props.left ? "row" : "row-reverse")};
  align-items: center;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 1.2rem 3rem;
  line-height: 1;
  font-weight: 500;
  font-size: 1.3rem;
  width: auto;
  flex-grow: 0;
  color: ${props => (props.solid ? "var(--text-color)" : "var(--color-primary-dark)")};
  border: ${props => (props.solid ? "1px solid transparent" : "1px solid var(--color-primary-dark)")};
  background-color: red; {'' /* ${props => (props.solid ? "var(--color-primary-dark)" : "transparent")}; */}
  border-radius: 5rem;
  box-shadow: ${props => (props.solid ? "0 1rem 5rem var(--shadow-color)" : "none")};
  transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1);

  @media ${props => props.theme.mediaQueries.large} {
    padding: 1.2rem 2rem;
  }
  @media ${props => props.theme.mediaQueries.small} {
    padding: 1.3rem 1.6rem;
  }
  @media ${props => props.theme.mediaQueries.smaller} {
    padding: 1rem 1.3rem;
  }
  &:active {
    transform: translateY(2px);
  }
`;

export const MovieButton = ({ title, solid, icon, left }) => {
  return (
    <StyledButton left={left} solid={solid}>
      <FontAwesomeIcon icon={icon} size="1x" style={left ? { marginRight: "10px" } : { marginLeft: "10px" }} />
      {title}
    </StyledButton>
  );
};
