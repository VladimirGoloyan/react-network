import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import postsMockup from "../data-mockup/posts-mockup";

class fbService {
  constructor() {
    this.baseUrl = "https://react-project-d7762-default-rtdb.firebaseio.com";
    if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);
  }

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

  resToUser = (res) => {
    const { uid, email, displayName, photoURL } = res.user;
    return { uid, email, displayName, photoURL }; 
  }

  login = async (credentials) => {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    return this.resToUser(res)
  }
  signup = async (credentials) => {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
      return this.resToUser(res)
  };
}
const fbservice = new fbService();
export default fbservice;
