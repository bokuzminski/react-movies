import React from "react";
import { Link } from "react-router-dom";
import Logo from "src/style/Logo.png";
import styled from "styled-components";

const LinkWrapper = styled(Link)`
  width: 100%;
  height: 18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-bottom: 2rem;
`;

const LogoWrapper = styled.img`
  max-width: 75%;
`;

export const LogoImage = () => {
  return (
    <LinkWrapper to={"/"}>
      <LogoWrapper src={Logo} />
    </LinkWrapper>
  );
};
