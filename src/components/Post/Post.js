import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";

import "./Post.scss";

const Post = ({ post, className = "", onClick}) => {
  return (
    <>
      
      <div className={`app-post ${className}`}>
        <span className="app-post__title">{post.title}</span>
        <span className="app-post__body">{post.body}</span>
        <div className="app-post__button-container">
        <Button onClick={onClick}>Delete</Button>
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number,
    userId: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default Post;
