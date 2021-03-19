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
    <div className="app-profile">
      <div className="app-profile__container">
      {context.state.user ? (
        <span>
          Profile of 
          {' ' + context.state.user.data.displayName || ' ' +  context.state.user.data.email}
        </span>
      ): null}
      <Button onClick={logOutHandler} className="app-profile__container__log-out">
        Log out
      </Button>
      </div>
    </div>
  );
};

export default Profile;
