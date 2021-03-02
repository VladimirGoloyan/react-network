import React, { Component } from "react";
import service from "../../api/service";
import Post from "../Post/Post";

import "./PostDetails.scss";

export default class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    service
      .getPost(this.props.match.params.postId)
      .then((data) => {
        this.setState({ post: data });
      })
      .catch((err) => {
        this.props.history.push("/");
      });
  }

  render() {
    const { post } = this.state;

    if (!post) {
      return <div>Loading</div>;
    }

    return (
      <div className="postdetails-container">
        <Post post={post} />
      </div>
    );
  }
}
