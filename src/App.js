import React, { Component, useContext, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./components/AppRoutes/AppRoutes";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";

import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext({
  user: null,
  setUser: () => {},
});

export class App extends Component {
  state = {
    user:null
  }

  setUser = (newUser) => {
    this.setState({
      user:newUser
    })
  }

  render() {
    return (
      <>
        <AppContext.Provider value={{user:this.state.user,setUser:this.setUser}}>
          <BrowserRouter>
            <Header />
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </AppContext.Provider>
        <ToastContainer
          position="bottom-right"
          className="app-toast-container"
        />
      </>
    );
  }
}

export default App;
