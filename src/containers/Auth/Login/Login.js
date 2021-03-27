import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useHistory } from "react-router-dom";
import fbservice from "../../../api/fbService";
import storeService from "../../../api/storageService";

import Button from "@material-ui/core/Button";
import Input from "../../../components/Input/Input";

import "./Login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const context = useContext(AppContext);
  const history = useHistory();

  const changeCredentials = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const user = await fbservice.login(credentials);
      context.dispatch({ type: "SET_USER", payload: { user } });
      storeService.setData("user", user, "local");
      history.replace("/profile");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="app-auth-login">
      <Input
        value={credentials.email}
        placeholder="Enter email"
        onChange={(e) => changeCredentials("email", e.target.value)}
      />
      <Input
        type="password"
        value={credentials.password}
        placeholder="Enter password"
        onChange={(e) => changeCredentials("password", e.target.value)}
      />
      <Button
        variant="contained"
        className="app-auth-login__button"
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
