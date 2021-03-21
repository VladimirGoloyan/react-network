import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import storeService from "../../api/storageService";
import { AppContext } from "../../context/AppContext";

import Loader from '../../components/Loader/Loader'
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
      {context.state.user.data.displayName ? (
        <span>
          Profile of 
          {' ' + context.state.user.data.displayName || ' ' +  context.state.user.data.email}
        </span>
      ): (
        <Loader/>
      )}
      <Button onClick={logOutHandler} className="app-profile__container__log-out">
        Log out
      </Button>
      </div>
    </div>
  );
};

export default Profile;
