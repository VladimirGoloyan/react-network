import React from "react";
import { Route, Switch } from "react-router-dom";

import Posts from "../../containers/Posts/Posts";
import Homepage from "../../containers/Homepage/Homepage";
import Todos from "../../containers/Todos/Todos";
import Auth from "../../containers/Auth/Auth";
import PostDetails from "../PostDetails/PostDetails";
import Page404 from "../Page404/Page404";

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/:postId" component={PostDetails} />
        <Route exact path="/todos" component={Todos} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/" component={Homepage} />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
