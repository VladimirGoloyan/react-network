import React, { useState, useContext } from "react";
import {useHistory} from 'react-router-dom'
import fbservice from "../../../api/fbService";
import storeService from "../../../api/storageService";
import { AppContext } from "../../../context/AppContext";

import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Button from "@material-ui/core/Button";
import Input from "../../../components/Input/Input";

import "./Signup.scss";

const Signup = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: ""
  });

  const changeCredentials = (e) => {
    setErrorState({
      emailError: "",
      passwordError: "",
    });
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
  });

  const handelSignup = async () => {
    try {
      setLoading(true);
      const user = await fbservice.signup(credentials);
      context.dispatch({ type: "SET_USER", payload: { user } });
      storeService.setData("user",user,'local')
      history.replace('/profile')
    } catch (err) {
      if (err.message[0] == "P") {
        setErrorState({
          passwordError: err.message,
        });
      } else if (err.message[4] == "e")
        setErrorState({
          emailError: err.message,
        });
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-auth-sign-up">
      <Input
        name='name'
        loading={loading}
        value={credentials.name}
        placeholder="Enter name"
        onChange={changeCredentials}
      />
      <Input
        name='email'
        loading={loading}
        value={credentials.email}
        placeholder="Enter email"
        onChange={changeCredentials}
      />
      {errorState.emailError && <ErrorMessage text={errorState.emailError} />}
      <Input
      name='password'
        type="password"
        loading={loading}
        value={credentials.password}
        placeholder="Enter password"
        onChange={changeCredentials}
      />
      {errorState.passwordError && (
        <ErrorMessage text={errorState.passwordError} />
      )}
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        onClick={handelSignup}
      >
        Sign up
      </Button>
    </div>
  );
};

export default Signup;
