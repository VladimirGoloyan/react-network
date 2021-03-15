import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import fbservice from "../../../api/fbService";
import storeService from "../../../api/storageService";
import { AppContext } from "../../../context/AppContext";

import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Button from "@material-ui/core/Button";
import Input from "../../../components/Input/Input";
import inputValidation from "../../../utils/inputValidation";

import "./Signup.scss";

const Signup = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
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
    nameError: "",
  });

  const handelSignup = async () => {
    try {
      setLoading(true);

      switch (inputValidation.checkCred(credentials)) {
        case 1:
          const user = await fbservice.signup(credentials);
          context.dispatch({ type: "SET_USER", payload: { user } });
          storeService.setData("user", user, "local");
          history.replace("/profile");
          break;
        case 0.1:
          setErrorState({ ...errorState, emailError: "Email badly formatted" });
          break;
        case 0.2:
          setErrorState({ ...errorState, passwordError: "Password must contain at least 8 characters" });
          break;
        case 0.3:
          setErrorState({ ...errorState, nameError: "Name cannot contain numbers" });
          break;
        default:
          console.log(
            "Default case in signup validation, something went wrong !"
          );
      }
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
        name="name"
        loading={loading}
        value={credentials.name}
        placeholder="Enter name"
        onChange={changeCredentials}
      />
      {errorState.nameError && <ErrorMessage text={errorState.nameError} />}
      <Input
        name="email"
        loading={loading}
        value={credentials.email}
        placeholder="Enter email"
        onChange={changeCredentials}
      />
      {errorState.emailError && <ErrorMessage text={errorState.emailError} />}
      <Input
        name="password"
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
      className='app-auth-sign-up__button'
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
