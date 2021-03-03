import React from "react";
import PropTypes from "prop-types";

import Link from "../Link/Link";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

import "./Post.scss";

const Post = ({ post, className = "", onClick, isLink = false , edit = () => {} }) => {
  const Wrapper = ({ children }) => {
    return isLink ? (
      <Link to={`posts/${post.id}`}>{children}</Link>
    ) : (
      <div>
        {children}
        <Button  variant='contained' color="primary" onClick={edit}>
          <EditIcon />
          <span>Edit</span>
        </Button>
      </div>
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
    edit: PropTypes.func
  }),
  className: PropTypes.string,
};

export default Post;
