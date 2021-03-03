import React from "react";

import "./Input.scss";

const Input = ({ children, onChange, value, className, placeholder }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className={(className, "app-input")}
      placeholder={placeholder}
    >
      {children}
    </input>
  );
};

export default Input;
