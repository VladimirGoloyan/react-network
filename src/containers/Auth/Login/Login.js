import React, { useState } from "react";
import fbservice from "../../../api/fbService";

import Button from "@material-ui/core/Button";
import Input from "../../../components/Input/Input";

import "./Login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const changeCredentials = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const userData = await fbservice.login(credentials)
  }

  return (
    <div className="app-auth-login">
      <Input
        value={credentials.email}
        placeholder="Enter email"
        onChange={(e) => changeCredentials("email", e.target.value)}
      />
      <Input
        value={credentials.password}
        placeholder="Enter password"
        onChange={(e) => changeCredentials("password", e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

Login.propTypes = {};

export default Login;
