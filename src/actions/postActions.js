import { actionTypesRedux } from "../reducers/actionTypesRedux";

export const setReduxPosts = (posts) => ({
  type: actionTypesRedux.SET_POSTS,
  payload: {
    posts,
  },
});
export const getMoreReduxPosts = (posts) => ({
  type: actionTypesRedux.GET_MORE_POSTS,
  payload: {
    posts,
  },
});
export const createReduxPosts = (post) => ({
  type: actionTypesRedux.CREATE_POST,
  payload: {
    post,
  },
});
export const deleteReduxPost = (post) => ({
  type: actionTypesRedux.DELETE_POST,
  payload: {
    post,
  },
});
