import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import Link from "../Link/Link";

import "./Post.scss";

const Post = ({ post, className = "", onClick, isLink = false }) => {
  const Wrapper = ({ children }) => {
    return isLink ? (
      <Link to={`posts/${post.id}`}>{children}</Link>
    ) : (
      <div>{children}</div>
    );
  };

  return (
    <Wrapper>
      <div className={`app-post ${className}`}>
        <span className="app-post__title">{post.title}</span>
        <span className="app-post__body">{post.body}</span>
      </div>
    </Wrapper>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number,
    userId: PropTypes.number,
    isLink: PropTypes.bool,
  }),
  className: PropTypes.string,
};

export default Post;
