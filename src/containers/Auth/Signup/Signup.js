import React, {useState} from "react";
import fbservice from "../../../api/fbService";

import Button from "@material-ui/core/Button";
import Input from "../../../components/Input/Input";

import "./Signup.scss";
const Signup = () => {

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

  const handelSignup = async () => {
    const userData = await fbservice.signup(credentials)
  }

  return (
    <div className="app-auth-sign-up">
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
      <Button variant="contained" color="primary" onClick={handelSignup}>
        Sign up
      </Button>
      </div>
  );
};

export default Signup;
