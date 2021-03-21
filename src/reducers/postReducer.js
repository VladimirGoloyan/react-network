import { actionTypesRedux } from "./actionTypesRedux.js";

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypesRedux.SET_POSTS:
      console.log(action);
      return action.payload.posts;

    case actionTypesRedux.GET_MORE_POSTS:
      console.log(action);
      return [...state, ...action.payload.posts];

    case actionTypesRedux.UPDATE_POST:
      console.log(action);
      return state.posts.map((el) => {
        if (el.id == action.payload.todo.id) {
          return action.payload.post;
        }
        return el;
      });

    case actionTypesRedux.CREATE_POST:
      console.log(action);
      return [...state, action.payload.post];

    case actionTypesRedux.DELETE_POST:
      console.log(action);
      return state.filter((el) => {
        return el.id != action.payload.post;
      });

    default:
      return state;
  }
};

export default reducer;
