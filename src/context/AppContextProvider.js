import React, { useReducer } from "react";

import { AppContext, initialState } from "./AppContext";
import AppReducer from "./AppReducer";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

export default AppContextProvider;
