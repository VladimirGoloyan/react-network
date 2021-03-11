import React, { Component, useContext, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./components/AppRoutes/AppRoutes";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import AppProvider from "./context/AppContextProvider";

import "react-toastify/dist/ReactToastify.css";

export class App extends Component {
  render() {
    return (
      <>
        <AppProvider>
          <BrowserRouter>
            <Header />
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </AppProvider>
        <ToastContainer
          position="bottom-right"
          className="app-toast-container"
        />
      </>
    );
  }
}

export default App;
