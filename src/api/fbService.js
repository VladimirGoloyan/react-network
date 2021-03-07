import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./firebaseConfig";

import postsMockup from "../data-mockup/posts-mockup";
import { PostAddRounded } from "@material-ui/icons";

class fbService {
  constructor() {
    this.baseUrl = "https://react-project-d7762-default-rtdb.firebaseio.com";
    if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);
  }

  _request = (method = "GET", url, data = null) => {
    return fetch(`${this.baseUrl}${url}.json`, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : null,
    }).then((res) => {
      if (res.status >= 400) {
        const error = new Error("Error status :", res.status);
        throw error;
      }
      return res.json();
    });
  };

  pushPosts() {
    firebase.database().ref("/posts").set(postsMockup);
  }

  getAllPosts = async () => {
    const allPosts = await firebase.database().ref("/posts").get();
    const data = allPosts.toJSON();
    return Object.values(data);
  };
  getPosts = async (startAt = 0, endAt = 4) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    return Object.values(data);
  };

  updatePost = async (postData) => {
    const postRef = firebase.database().ref(`posts/${postData.id}`);
    await postRef.update(postData);
    console.log(postData);
    const res = await postRef.get();
    return res.val();
  };
  deletePost = async (id) => {
    const postRef = firebase.database().ref(`posts/${id}`);
    await postRef.remove();

    const posts = await this.getAllPosts();
    firebase
      .database()
      .ref("posts")
      .set(
        posts.map((el, idx) => {
          return {
            ...el,
            id: idx,
          };
        })
      );
  };
  getPost = (id) => {
    return this._request("GET", `/posts/${id}`);
  };

  createPost = async (postData) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .limitToLast(1)
      .get();
    const lastItemJson = res.toJSON();
    const lastItem = Object.values(lastItemJson)[0];
    const { id } = lastItem;

    const newItem = {
      ...postData,
      id: id + 1,
    };

    await firebase
      .database()
      .ref(`posts/${id + 1}`)
      .set(newItem);
    return newItem;
  };
}

const fbservice = new fbService();
export default fbservice;
