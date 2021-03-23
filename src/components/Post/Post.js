import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import PropTypes from "prop-types";

import Link from "../Link/Link";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

import "./Post.scss";

const Post = ({
  post,
  children,
  className = "",
  onClick,
  isLink = false,
  edit = () => {},
  remove = () => {},
}) => {
  const context = useContext(AppContext);

  const removeHandler = (e) => {
    e.preventDefault();
    remove();
  };

  const Wrapper = ({ children }) => {
    return isLink ? (
      <Link to={`posts/${post.id}`}>
        <div className={`app-post ${className}`}>
          {children}
          {context.state.user ? (
            <Button
              variant="outlined"
              className="app-post__delete"
              onClick={removeHandler}
            >
              Delete
            </Button>
          ) : null}
        </div>
      </Link>
    ) : (
      <div className={`app-post ${className}`}>
        {children}
        <Button
          variant="contained"
          className="app-posts__button"
          onClick={edit}
        >
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
        <hr className="app-post__hr" />
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
    edit: PropTypes.func,
  }),
  className: PropTypes.string,
};

export default Post;
