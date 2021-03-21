import { actionTypesRedux } from "./actionTypesRedux.js";

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypesRedux.SET_TODOS:
      console.log(action);
      return action.payload.todos;

    case actionTypesRedux.GET_MORE_TODOS:
      console.log(action);
      return [...state, ...action.payload.todos];

    case actionTypesRedux.UPDATE_TODO:
      console.log(action);
      return state.posts.map((el) => {
        if (el.id == action.payload.todo.id) {
          return action.payload.todo;
        }
        return el;
      });

    case actionTypesRedux.CREATE_TODO:
      console.log(action);
      return [...state, action.payload.todo];

    case actionTypesRedux.DELETE_TODO:
      console.log(action);
      return state.filter((el) => {
        return el.id != action.payload.id;
      });

    default:
      return state;
  }
};

export default reducer;
