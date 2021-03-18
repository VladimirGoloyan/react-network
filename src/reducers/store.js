import { createStore } from "redux";

import {actionTypesRedux} from "./actionTypesRedux.js";

const initialState = {
  todos: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesRedux.SET_TODOS:
      console.log(action);
      return {
        ...state,
        todos: action.payload.todos,
      };
    case actionTypesRedux.GET_MORE_TODOS:
      console.log(action);
      return {
        ...state,
        todos: [...state.todos, ...action.payload.todos],
      };
    case actionTypesRedux.UPDATE_TODOS:
      console.log(action);
      return {
        ...state,
        posts: state.posts.map((el) => {
          if (el.id == action.payload.todo.id) {
            return action.payload.post;
          }
          return el;
        }),
      };
    case actionTypesRedux.CREATE_TODO:
      console.log(action);
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
