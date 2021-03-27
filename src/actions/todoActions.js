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
      type: actionTypesRedux.GET_MORE_TODOS,
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
        todo: data,
      },
    });
  });
};

export const deleteReduxTodo = (id, start) => (dispatch) => {
  fbService.deleteItem(id, "todos").then(() => {
    fbService.getItems(0, start - 1, "todos").then((data) => {
      dispatch({
        type: actionTypesRedux.SET_TODOS,
        payload: {
          todos: data,
        },
      });
    });
  });
};

export const updateReduxTodo = (newTodo) => (dispatch, getState) => {
  fbService.updateItem(newTodo, "todos").then((data) => {
    setReduxTodos(0, calcLength(data.id));
    dispatch({
      type: actionTypesRedux.UPDATE_TODO,
      payload: {
        todo: data,
      },
    });
  });
};

const calcLength = (num) => {
  let start = 0;
  while (num > start) {
    if (num === start) break;
    start = start + 5;
  }
  return start;
};