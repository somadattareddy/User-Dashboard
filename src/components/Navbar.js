import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Brand to="/">User Dashboard</Brand>
    </NavbarContainer>
  );
};

export default Navbar;