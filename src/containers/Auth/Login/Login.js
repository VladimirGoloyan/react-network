import React from "react";

import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

import "./Login.scss";

const Login = () => {
  return (
    <div className="app-login">
      <Input placeholder="Enter email" />
      <Input placeholder="Enter password" />
      <Button>Log in</Button>
    </div>
  );
};

export default Login;
