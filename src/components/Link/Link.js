import React from "react";
import PropTypes from "prop-types";

import { Link as RouterLink } from "react-router-dom";

import "./Link.scss";

const Link = ({ children, className, to }) => {
  return (
    <RouterLink to={to} className={(className, "app-link")}>
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  className: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default Link;
