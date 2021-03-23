import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import storeService from "../../api/storageService";

import { Button } from "@material-ui/core";
import Loader from "../../components/Loader/Loader";

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
        {context.state.user && context.state.user.displayName ? (
          <span>
            Profile of
            {" " + context.state.user.displayName ||
              " " + context.state.user.email}
          </span>
        ) : (
          <Loader />
        )}
        <Button
          onClick={logOutHandler}
          className="app-profile__container__log-out"
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
