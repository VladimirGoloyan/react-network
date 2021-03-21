import { combineReducers, createStore } from "redux";

import postsReducer from './postReducer'
import todossReducer from './todosReducer'


const reducer = combineReducers({
  posts:postsReducer,
  todos:todossReducer
})

export const store = createStore(reducer);
