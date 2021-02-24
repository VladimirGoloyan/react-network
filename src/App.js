import React, { Component } from "react";
//import axios from "axios";

import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Posts from "./containers/Posts/Posts";

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Layout>         
          <Posts/>
        </Layout>
      </div>
    );
  }
}

export default App;
