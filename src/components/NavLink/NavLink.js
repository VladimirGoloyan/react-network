import React from "react";
import PropTypes from "prop-types";

import "./NavLink.scss";

import { NavLink as RouterNavLink } from "react-router-dom";
const NavLink = ({ children, to }) => {
  return (
    <RouterNavLink
      exact
      to={to}
      className="app-nav-link"
      activeClassName="app-nav-link--active"
    >
      {children}
    </RouterNavLink>
  );
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired
}

export default NavLink;
