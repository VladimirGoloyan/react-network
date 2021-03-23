import { actionTypesRedux } from "../reducers/actionTypesRedux";

import fbService from "../api/fbService";

export const setReduxPosts = (start, limit) => (dispatch) => {
  fbService
    .getItems(start, limit, "posts")
    .then((data) => {
      dispatch({
        type: actionTypesRedux.SET_POSTS,
        payload: {
          posts: data,
        },
      });
    })
    .catch((err) => {
      console.log("Caught an error : ", err);
    });
};

export const getMoreReduxPosts = (start, limit) => (dispatch) => {
  fbService.getItems(start, start + limit, "posts").then((data) => {
    dispatch({
      type: actionTypesRedux.GET_MORE_POSTS,
      payload: {
        posts: data,
      },
    });
  });
};

export const createReduxPosts = (post) => (dispatch) => {
  fbService.createItem(post, "posts").then((data) => {
    dispatch({
      type: actionTypesRedux.CREATE_POST,
      payload: {
        post: data,
      },
    });
  });
};

export const deleteReduxPost = (id, start) => (dispatch) => {
  fbService.deleteItem(id, "posts").then(() => {
    fbService.getItems(0, start - 1, "posts").then((data) => {
      dispatch({
        type: actionTypesRedux.SET_POSTS,
        payload: {
          posts: data,
        },
      });
    });
  });
};

export const updateReduxPost = (newPost) => (dispatch, getState) => {
  fbService.updateItem(newPost, "posts").then((data) => {
    setReduxPosts(0, calcLength(data.id));
    dispatch({
      type: actionTypesRedux.UPDATE_POST,
      payload: {
        post: data,
      },
    });
  });
};

const calcLength = (num) => {
  const start = 0;
  while (num > start) {
    if (num == start) break;
    start = start + 5;
  }
  return start;
};
