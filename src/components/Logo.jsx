import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../style/Logo.png";

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

const LogoImg = () => {
  return (
    <LinkWrapper to={"/react-movies"} >
      <LogoWrapper src={Logo} />
    </LinkWrapper>
  );
};

export default LogoImg;
