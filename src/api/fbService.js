import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./firebaseConfig";

import postsMockup from "../data-mockup/posts-mockup";

class fbService {
  constructor() {
    this.baseUrl = "https://react-project-d7762-default-rtdb.firebaseio.com";
    firebase.initializeApp(firebaseConfig);
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
    fetch(
      "https://react-project-d7762-default-rtdb.firebaseio.com/posts.json",
      {
        method: "PUT",
        body: JSON.stringify(
          postsMockup.map((el) => ({ ...el, id: el.id - 1 }))
        ),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  getAllPosts = async () => {
    const allPosts = await firebase.database().ref("/posts").get();
    return allPosts.val();
    //return this._request("GET", "/posts");
  };
  getPosts = (start, limit) => {
    return this._request("GET", `/posts?_start=${start}&_limit=${limit}`);
  };

  getAllPosts = () => {
    return this._request("GET", "/posts");
  };

  getPost = (id) => {
    return this._request("GET", `/posts/${id}`);
  };

  createPost = (data) => {
    return this._request("POST", "/posts", data);
  };

  updatePost = (id, data) => {
    return this._request("PATCH", `/posts/${id}`, data);
  };

  deletePost = (id) => {
    return this._request("DELETE", `/posts/${id}`);
  };
}

const fbservice = new fbService();
export default fbservice;
