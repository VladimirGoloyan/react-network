import { actionTypesRedux } from "../reducers/actionTypesRedux";

import fbService from "../api/fbService";

export const setReduxTodos = (start, limit) => (dispatch) => {
  fbService
    .getItems(start, limit, "todos")
    .then((data) => {
      dispatch({
        type: actionTypesRedux.SET_TODOS,
        payload: {
          todos: data,
        },
      });
    })
    .catch((err) => {
      console.log("Caught an error : ", err);
    });
};

export const getMoreReduxTodos = (start, limit) => (dispatch) => {
  fbService.getItems(start, start + limit, "todos").then((data) => {
    dispatch({
      type: actionTypesRedux.GET_MORE_POSTS,
      payload: {
        todos: data,
      },
    });
  });
};

export const createReduxTodo = (todo) => (dispatch) => {
  fbService.createItem(todo, "todos").then((data) => {
    dispatch({
      type: actionTypesRedux.CREATE_TODO,
      payload: {
        todo:data,
      },
    });
  });
};

export const deleteReduxTodo = (todo) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.DELETE_TODO,
    payload: {
      todo,
    },
  });
};
