import React, { Component } from "react";
import fbService from "../../api/fbService";

import Post from "../Post/Post";
import Modal from "@material-ui/core/Modal";

import "./PostDetails.scss";
import { Button } from "@material-ui/core";

export default class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isEditModalOpen: false,
      titleValue: "",
      bodyValue: "",
    };
  }

  componentDidMount() {
    fbService
      .getItem(this.props.match.params.postId,'posts')
      .then((data) => {
        this.setState({
          post: data,
          titleValue: data.title,
          bodyValue: data.body,
        });
      })
      .catch((err) => {
        this.props.history.push("/");
      });
  }

  toggleEditModal = () => {
    this.setState((prevState) => ({
      isEditModalOpen: !prevState.isEditModalOpen,
    }));
    console.log(this.state.isEditModalOpen);
  };

  saveEditedPost = () => {
    fbService
      .updateItem({...this.state.post,
        title: this.state.titleValue,
        body: this.state.bodyValue},'posts')
      .then((res) => {
        this.setState({
          post: {
            ...this.state.post,
            title: this.state.titleValue,
            body: this.state.bodyValue,
          },
          isEditModalOpen:false
        });
      });
  };

  changeTitle = (e) => {
    this.setState({
      titleValue: e.target.value,
    });
  };

  changeBody = (e) => {
    this.setState({
      bodyValue: e.target.value,
    });
  };

  render() {
    const { post, isEditModalOpen, titleValue, bodyValue } = this.state;

    if (!post) {
      return <div>Loading</div>;
    }

    return (
      <div className="post-details-container">
        <Post post={post} edit={this.toggleEditModal} />
        <Modal
          className="post-details-container__edit-modal"
          open={isEditModalOpen}
          onClose={this.toggleEditModal}
        >
          <div className="post-details-container__edit-modal__inner">
            <input
              onChange={this.changeTitle}
              className="post-details-container__edit-modal__input"
              value={titleValue}
            ></input>
            <input
              onChange={this.changeBody}
              className="post-details-container__edit-modal__input"
              value={bodyValue}
            ></input>
            <Button
              variant="contained"
              color="primary"
              onClick={this.saveEditedPost}
            >
              Save
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
