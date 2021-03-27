import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { connect } from "react-redux";
import {
  setReduxPosts,
  getMoreReduxPosts,
  createReduxPosts,
  deleteReduxPost,
} from "../../actions/postActions";
import fbService from "../../api/fbService";

import Button from "@material-ui/core/button";
import Post from "../../components/Post/Post";
import ItemModal from "../../components/ItemModal/ItemModal";
import Loader from "../../components/Loader/Loader";

import "./Posts.scss";

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
    if (!props.posts) {
      props.setReduxPosts(0, limit);
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
    fbService.pushPosts();
  };

  const createPost = () => {
    const newPost = {
      title: titleValue,
      body: bodyValue,
      userId: 1,
    };
    props.createReduxPosts(newPost);
    toggleCreateModal();
  };

  const deletePost = async (id) => {
    props.deleteReduxPost(id, start);
  };

  const getMore = () => {
    const newStart = start + limit + 1;
    setState({
      ...state,
      start: newStart,
    });
    props.getMoreReduxPosts(start, limit);
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
        {/*  Reset tool button
           
        <Button className="app-posts__button" onClick={() => pushPosts()}>
          Reset original posts
        </Button> */}
      </div>
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
              </div>
            );
          })}
          {hasMore && (
            <div className="app-posts__get-more">
              <Button className="app-posts__button" onClick={() => getMore()}>
                Get More Posts
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  setReduxPosts,
  getMoreReduxPosts,
  createReduxPosts,
  deleteReduxPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
