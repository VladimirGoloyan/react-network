import React, { Component } from "react";
import fbservice from "../../api/fbService";

import Button from "@material-ui/core/button";
import Post from "../../components/Post/Post";
import ItemModal from "../../components/ItemModal/ItemModal";

import "./Posts.scss";
import { actionTypes } from "../../context/actionTypes";
import { AppContext } from "../../context/AppContext";

export default class Posts extends Component {
  state = {
    start: 0,
    limit: 4,
    hasMore: true,
    isCreateModalOpen: false,
    titleValue: "",
    bodyValue: "",
  };

  static contextType = AppContext;

  render() {
    return (
      <>
        <ItemModal
          action={this.createPost}
          bodyValue={this.state.bodyValue}
          titleValue={this.state.titleValue}
          changeValue={this.changeValue}
          isOpen={this.state.isCreateModalOpen}
          onClose={this.toggleCreateModal}
          buttonTitle="Create"
        />
        <div className="app-posts__buttons">
          <Button onClick={() => this.toggleCreateModal()}>Create Post</Button>
          <Button onClick={() => this.pushPosts()}>Reset original posts</Button>
        </div>
        {this.context.state.posts ? (
          <div className="app-posts">
            {this.context.state.posts.map((el, idx) => {
              return (
                <div key={idx} className="app-posts__container">
                  <Post
                    key={el.id}
                    post={el}
                    className="app-posts__post"
                    isLink
                    remove={() => this.deletePost(el.id)}
                  />
                  <span>{"--" + el.id + "--"}</span>
                </div>
              );
            })}
            {this.state.hasMore && (
              <div className="app-posts__get-more">
                <Button onClick={() => this.getMore()}>Get More Posts</Button>
              </div>
            )}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </>
    );
  }

  componentDidMount() {
    if (!this.context.state.posts) {
      fbservice
        .getItems(this.state.start, this.state.limit, "posts")
        .then((data) => {
          this.context.dispatch({
            type: actionTypes.SET_POSTS,
            payload: { posts: data },
          });
        })
        .catch((err) => {
          console.log("Caught an error : ", err);
        });
    }
  }

  toggleCreateModal = () => {
    this.setState((prev) => ({
      isCreateModalOpen: !prev.isCreateModalOpen,
    }));
  };

  changeValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  pushPosts = () => {
    fbservice.pushPosts();
  };

  createPost = () => {
    const newPost = {
      title: this.state.titleValue,
      body: this.state.bodyValue,
      userId: 1,
    };
    fbservice.createItem(newPost, "posts").then(data => {
      this.context.dispatch({
        type: actionTypes.CREATE_POST,
        payload: { post: data },
      });
      this.toggleCreateModal();
    });
  };

  deletePost = (id) => {
    fbservice
      .deleteItem(id, "posts")
      .then(() => {
        this.setState({
          posts: this.state.posts.filter((el) => {
            return el.id != id;
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getMore = () => {
    const { start, limit } = this.state;
    const newStart = start + limit + 1;
    this.setState({
      start: newStart,
    });
    fbservice.getItems(start, start + limit, "posts").then((data) => {
      this.context.dispatch({
        type: actionTypes.GET_MORE_POSTS,
        payload: { posts: data },
      });
      this.setState({
        hasMore: data.length < limit ? false : true,
      });
    });
  };
}
