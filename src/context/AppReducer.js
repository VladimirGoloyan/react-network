import { actionTypes } from "./actionTypes";

const AppReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      console.log(action);
      return {
        ...state,
        user: action.payload.user,
      };
    case actionTypes.REMOVE_USER:
      console.log(action);
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default AppReducer;
