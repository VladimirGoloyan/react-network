import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { connect } from "react-redux";
import {setReduxPosts, getMoreReduxPosts, createReduxPosts, deleteReduxPost} from '../../actions/postActions'
import fbservice from "../../api/fbService";

import Button from "@material-ui/core/button";
import Post from "../../components/Post/Post";
import ItemModal from "../../components/ItemModal/ItemModal";
import "./Posts.scss";
import Loader from "../../components/Loader/Loader";

const Posts = (props) => {
  const [state, setState] = useState({
    start: 5,
    limit: 4,
    hasMore: true,
    isCreateModalOpen: false,
    titleValue: "",
    bodyValue: "",
  });

  const {
    start,
    limit,
    hasMore,
    isCreateModalOpen,
    titleValue,
    bodyValue,
  } = state;
  
  const context = useContext(AppContext);
  
  useEffect(() => {
    {console.log("props",props)}
    if (!props.posts) {
      fbservice
        .getItems(0, limit, "posts")
        .then((data) => {
          props.setReduxPosts(data);
        })
        .catch((err) => {
          console.log("Caught an error : ", err);
        });
    }
  }, []);

  const toggleCreateModal = () => {
    setState((prev) => ({
      ...state,
      isCreateModalOpen: !prev.isCreateModalOpen,
    }));
  };

  const changeValue = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const pushPosts = () => {
    fbservice.pushPosts();
  };

  const createPost = () => {
    const newPost = {
      title: titleValue,
      body: bodyValue,
      userId: 1,
    };
    fbservice.createItem(newPost, "posts").then((data) => {
      props.createReduxPosts(data);
      toggleCreateModal();
      props.history.push(`posts/${data.id}`)
    });
  };

  const deletePost = async (id) => {
    await fbservice.deleteItem(id,'posts');
    props.deleteReduxPost(id);
    const data = await fbservice.getItems(0,start-1,'posts');
    props.setReduxPosts(data);
  };

  const getMore = () => {
    const {start, limit } = state
    const newStart = start + limit + 1;
    setState({
      ...state,
      start: newStart,
    });
    fbservice.getItems(start, start + limit, "posts").then((data) => {
      props.getMoreReduxPosts(data)
      setState({
        ...state,
        hasMore: data.length < limit ? false : true,
      });
    });
  };

  return (
    <>
      <ItemModal
        action={createPost}
        bodyValue={bodyValue}
        titleValue={titleValue}
        changeValue={changeValue}
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
        buttonTitle="Create"
      />
      <div className="app-posts__buttons-container">
        {context.state.user && (
          <Button
            className="app-posts__button"
            onClick={() => toggleCreateModal()}
          >
            Create Post
          </Button>
        )}
        <Button className="app-posts__button" onClick={() => pushPosts()}>
          Reset original posts
        </Button>
      </div>
      {console.log(props)}
      {props.posts ? (
        <div className="app-posts">
          {props.posts.map((el, idx) => {
            return (
              <div key={idx} className="app-posts__container">
                <Post
                  key={el.id}
                  post={el}
                  className="app-posts__post"
                  isLink
                  remove={() => deletePost(el.id)}
                />
                <span>{"--" + el.id + "--"}</span>
              </div>
            );
          })}
          {hasMore && (
            <div className="app-posts__get-more">
              <Button
                className="app-posts__button"
                onClick={() => getMore()}
              >
                Get More Posts
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Loader/>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("state",state)
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  setReduxPosts, 
  getMoreReduxPosts, 
  createReduxPosts, 
  deleteReduxPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
