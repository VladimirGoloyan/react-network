import React, { Component } from "react";
import fbService from "../../api/fbService";

import Post from "../Post/Post";
import { AppContext } from "../../context/AppContext";
import { actionTypes } from "../../context/actionTypes";
import ItemModal from "../ItemModal/ItemModal";

import "./PostDetails.scss";

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

  static contextType = AppContext;

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
      .updateItem(
        {
          ...this.state.post,
          title: this.state.titleValue,
          body: this.state.bodyValue,
        },
        "posts"
      )
      .then((res) => {
        const newPost = {
          ...this.state.post,
            title: this.state.titleValue,
            body: this.state.bodyValue,
        }
        this.setState({
          post: newPost,
          isEditModalOpen: false,
        });
        this.context.dispatch({type:actionTypes.UPDATE_POST, payload:{post:newPost}})
      });
  };

  changeValue = (e) =>{
    this.setState({
      ...this.state,
      [e.target.name]:e.target.value
    })
  }

  

  render() {
    const { post, isEditModalOpen, titleValue, bodyValue } = this.state;

    if (!post) {
      return <div>Loading</div>;
    }

    return (
      <div className="post-details-container">
        <Post post={post} edit={this.toggleEditModal} />
        <ItemModal
            action={this.saveEditedPost}
            bodyValue={bodyValue}
            titleValue={titleValue}
            changeValue={this.changeValue}
            isOpen={isEditModalOpen}
            onClose={this.toggleEditModal}
            buttonTitle="Save"
        />
      </div>
    );
  }
}
