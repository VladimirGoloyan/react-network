import React from "react";
import PropTypes from "prop-types";

import "./Input.scss";

const Input = ({name='',loading, type='text', children, onChange, value, className='', placeholder='Enter text' }) => {
  return (
    <input
      name={name}
      disabled={loading}
      type={type}
      onChange={onChange}
      value={value}
      className={(className, "app-input")}
      placeholder={placeholder}
    >
      {children}
    </input>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default Input;
