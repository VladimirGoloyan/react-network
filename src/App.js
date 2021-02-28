import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Posts from "./containers/Posts/Posts";
import Homepage from "./containers/Homepage/Homepage";
import Todos from "./containers/Todos/Todos";

export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Layout>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/posts"component={Posts}/>
            <Route exact path="/todos"component={Todos}/>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
