import React from "react";
import PropTypes from "prop-types";

import "./ErrorMessage.scss";
const ErrorMessage = ({ text = 'Error' }) => {
  return <span className="app-error-message">{text}</span>;
};

ErrorMessage.propTypes = {
  text: PropTypes.string,
};
export default ErrorMessage;
