import React, { useState } from "react";

import AppContext from './AppContext'
import AppReducer from './AppReducer'

const AppContextProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const setUserHandler = (newUser) => {
      setUser(newUser)
  }

  

  return (
    <div>
      <AppContext.Provider value={{ user: this.state.user, setUser : this.setUser }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

export default AppContextProvider;
