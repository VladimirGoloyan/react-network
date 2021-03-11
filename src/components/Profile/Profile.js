import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import storeService from "../../api/storageService";
import fbService from "../../api/fbService";
import { AppContext } from "../../context/AppContext";

import { Button } from "@material-ui/core";

import "./Profile.scss";

const Profile = () => {
  const context = useContext(AppContext);
  const history = useHistory();

  const logOutHandler = () => {
    context.dispatch({ type: "REMOVE_USER" });
    storeService.remData("user", "local");
    console.log(context.state.user);
    history.replace("/auth");
  };

  return (
    <div>
      Profile of {context.state.user.displayName}
      <Button onClick={logOutHandler} color="primary" variant="contained">
        Log out
      </Button>
    </div>
  );
};

export default Profile;
