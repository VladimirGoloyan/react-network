import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import postsMockup from "../data-mockup/posts-mockup";
import todosMockup from "../data-mockup/todos-mockup";

class fbService {
  constructor() {
    this.baseUrl = "https://react-project-d7762-default-rtdb.firebaseio.com";
    if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);
  }

  pushPosts() {
    firebase.database().ref("/posts").set(postsMockup);
  }

  pushTodos(){
    firebase.database().ref("/todos").set(todosMockup);
  }

  getAllItems = async (path) => {
    const allPosts = await firebase.database().ref(path).get();
    const data = allPosts.toJSON();
    return Object.values(data);
  };

  getItem = async (id, path) => {
    const res = await firebase.database().ref(`${path}/${id}`).get();
    return res.toJSON();
  };

  getItems = async (startAt = 0, endAt = 4, path) => {
    const res = await firebase
      .database()
      .ref(path)
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    return Object.values(data);
  };

  updateItem = async (itemData, path) => {
    const postRef = firebase.database().ref(`${path}/${itemData.id}`);
    await postRef.update(itemData);
    const res = await postRef.get();
    return res.val();
  };

  deleteItem = async (id, path) => {
    const itemRef = firebase.database().ref(`${path}/${id}`);
    await itemRef.remove();
    const items = await this.getAllItems(path);
    firebase
      .database()
      .ref(path)
      .set(
        items.map((el, idx) => {
          return {
            ...el,
            id: idx,
          };
        })
      );
  };

  createItem = async (postData,path) => {
    const res = await firebase
      .database()
      .ref(path)
      .orderByKey()
      .limitToLast(1)
      .get();
    const lastItemJson = res.toJSON();
    const lastItem = Object.values(lastItemJson)[0];
    const { id } = lastItem;
    console.log(id)
    const newItem = {
      ...postData,
      id: id + 1,
    };
    await firebase
      .database()
      .ref(`${path}/${id + 1}`)
      .set(newItem);
    return newItem;
  };

  resToUser = (res) => {
    const { uid, email, displayName, photoURL } = res.user;
    return { uid, email, displayName, photoURL };
  };

  login = async (credentials) => {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    return this.resToUser(res);
  };
  signup = async (credentials) => {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
    const user = firebase.auth().currentUser;
    await user.updateProfile({ displayName: credentials.name });
    return this.resToUser(res);
  };
}
const fbservice = new fbService();
export default fbservice;
