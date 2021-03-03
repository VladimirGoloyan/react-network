import React from "react";

import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

import "./Signup.scss";
const Signup = () => {
  return (
    <div className="app-sign-up">
      <Input placeholder="Enter email" />
      <Input placeholder="Enter password" />
      <Input placeholder="Confirm password" />
      <Button>Sign up</Button>
    </div>
  );
};

export default Signup;
