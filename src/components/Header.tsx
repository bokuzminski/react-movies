import React from "react";
import styled from "styled-components";

const Title = styled.h1<{ size?: string }>`
  font-family: "Proza Libre", sans-serif;
  font-size: ${props => (props.size === "2" ? "4rem" : "2.5rem")};
  font-weight: 400;
  line-height: ${props => (props.size === "2" ? "1.2" : "1")};
  color: var(--color-primary-dark);
  letter-spacing: -0.5px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  @media ${props => props.theme.mediaQueries.medium} {
    font-size: ${props => (props.size === "2" ? "2.7rem" : "2.2rem")};
  }
  @media ${props => props.theme.mediaQueries.small} {
    font-size: ${props => (props.size === "2" ? "2.2rem" : "2rem")};
  }
`;

const Subtitle = styled.h2<{ size?: string }>`
  font-family: "Proza Libre";
  text-transform: uppercase;
  line-height: ${props => (props.size === "2" ? "1.5" : "1")};
  color: var(--color-primary);
  font-size: ${props => (props.size === "2" ? "1.7rem" : "1.2rem")};
  font-weight: 700;
  @media ${props => props.theme.mediaQueries.medium} {
    font-size: ${props => (props.size === "2" ? "1.3rem" : "1.1rem")};
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const Header = ({ title, subtitle, size }: HeaderProps) => (
  <HeaderWrapper>
    <Title size={size}>{title}</Title>
    <Subtitle size={size}>{subtitle}</Subtitle>
  </HeaderWrapper>
);

type HeaderProps = {
  title: string;
  subtitle: string;
  size?: string;
};
