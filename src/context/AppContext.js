import {createContext} from 'react'

const initialState = {
    user: null,
    setUser: () => {},
}

const appContext = createContext(initialState);
export default appContext;
