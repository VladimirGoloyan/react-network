import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import postsReducer from "./postReducer";
import todossReducer from "./todosReducer";

const reducer = combineReducers({
  posts: postsReducer,
  todos: todossReducer,
});

const initialState = {
  posts:null,
  todos:null
}

export const store = createStore(reducer, initialState, applyMiddleware(reduxThunk));
