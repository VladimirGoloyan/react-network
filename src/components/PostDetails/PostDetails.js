import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReduxPost } from "../../actions/postActions";
import fbService from "../../api/fbService";

import Post from "../Post/Post";
import ItemModal from "../ItemModal/ItemModal";

import "./PostDetails.scss";

class PostDetails extends Component {
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
      .getItem(this.props.match.params.postId, "posts")
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
    this.props.updateReduxPost({
      ...this.state.post,
      title: this.state.titleValue,
      body: this.state.bodyValue,
    });
    const newPost = {
      ...this.state.post,
      title: this.state.titleValue,
      body: this.state.bodyValue,
    };
    this.setState({
      post: newPost,
      isEditModalOpen: false,
    });
  };

  changeValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { post, isEditModalOpen, titleValue, bodyValue } = this.state;

    if (!post) {
      return <div>Loading</div>;
    }

    return (
      <div className="post-details-container">
        <div className="post-details-container__inner">
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  updateReduxPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
