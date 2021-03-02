import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./components/AppRoutes/AppRoutes";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";


export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Layout>
            <AppRoutes/>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
