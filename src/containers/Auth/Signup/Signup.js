import React, { useState, useContext } from "react";
import fbservice from "../../../api/fbService";
//import { AppContext } from '../../../context/AppContext'

import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Button from "@material-ui/core/Button";
import Input from "../../../components/Input/Input";

import "./Signup.scss";

const Signup = () => {
  //const context = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  
  
  const changeCredentials = (name, value) => {
    setErrorState({
      emailError: "",
      passwordError: "",
    });
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  
  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
  });
  
  const handelSignup = async () => {
    try {
      setLoading(true);
      const userData = await fbservice.signup(credentials);
     // context.setUser(userData)
    } catch (err) {
      if(err.message[0] == "P"){
        setErrorState({
          passwordError: err.message,
        });  
      }
      else if (err.message[4] == 'e')
      setErrorState({
        emailError: err.message,
      });
      console.log(err.message)
    } finally{
      setLoading(false)
    }
  };



  return (
    <div className="app-auth-sign-up">
      <Input
        loading={loading}
        value={credentials.email}
        placeholder="Enter email"
        onChange={(e) => changeCredentials("email", e.target.value)}
      />
      {errorState.emailError && <ErrorMessage text={errorState.emailError} />}
      <Input
        loading={loading}
        value={credentials.password}
        placeholder="Enter password"
        onChange={(e) => changeCredentials("password", e.target.value)}
      />
      {errorState.passwordError && (
        <ErrorMessage text={errorState.passwordError} />
      )}
      <Button disabled={loading} variant="contained" color="primary" onClick={handelSignup}>
        Sign up
      </Button>
    </div>
  );
};

export default Signup;
