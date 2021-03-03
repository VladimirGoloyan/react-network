import React, { useState } from "react";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";

import "./Auth.scss";

const Auth = () => {
  const [authView, setAuthView] = useState(true);

  const toggleView = () => {
    setAuthView(!authView);
  };
  return (
    <div className="app-auth-container">
      {authView ? <Login /> : <Signup />}
      <span className="app-auth-container__changer" onClick={toggleView}>
        {authView ? "Sign up" : "Login"}
      </span>
    </div>
  );
};

export default Auth;
