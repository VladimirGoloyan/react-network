import { actionTypesRedux } from "../reducers/actionTypesRedux";

export const setReduxTodos = (todos) => ({
  type: actionTypesRedux.SET_TODOS,
  payload: {
    todos,
  },
});
export const getMoreReduxTodos = (todos) => ({
  type: actionTypesRedux.GET_MORE_TODOS,
  payload: {
    todos,
  },
});
export const createReduxTodo = (todo) => ({
  type: actionTypesRedux.CREATE_TODO,
  payload: {
    todo,
  },
});
export const deleteReduxTodo = (todo) => ({
  type: actionTypesRedux.DELETE_TODO,
  payload: {
    todo,
  },
});
