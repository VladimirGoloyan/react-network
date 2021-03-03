import React, { Component } from "react";
import fbservice from "../../api/fbService";

import Button from "../../components/Button/Button";
import Post from "../../components/Post/Post";

import "./Posts.scss";

export default class Posts extends Component {
  state = {
    posts: [],
    start: 0,
    limit: 3,
    hasMore: true,
  };

  render() {
    return (
      <>
        {/* <div className="app-posts__buttons">
          <Button onClick={() => this.createPost()}>Create Post</Button>
          <Button onClick={() => this.updatePost()}>Update Post</Button>
        </div> */}
        {this.state.posts ? (
          <div className="app-posts">
            {this.state.posts.map((el, idx) => {
              return (
                <div key={idx} className="app-posts__container">
                  <Post
                    key={el.id}
                    post={el}
                    className="app-posts__post"
                    isLink
                  />
                  <div className="app-posts__delete">
                    <Button onClick={() => this.deletePost(el.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
            {/* {this.state.hasMore && (
              <div className="app-posts__get-more">
                <Button onClick={() => this.getMore()}>Get More Posts</Button>
              </div>
            )} */}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </>
    );
  }

  componentDidMount() {
    //fbservice.pushPosts();

    // fbservice
    //   .getAllPosts()
    //   .then((data) => {
    //     this.setState({
    //       posts: data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("Caught an error : ", err);
    //   });

    fbservice
      .getAllPosts()
      .then((data) => {
        this.setState({
          posts: data,
        });
      })
      .catch((err) => {
        console.log("Caught an error : ", err);
      });
  }

  createPost = () => {
    fbservice
      .createPost({
        title: "some title",
        body: "some body",
        userId: 1,
      })
      .then((data) => {
        this.setState({
          posts: [...this.state.posts, data],
        });
      });
  };

  updatePost = () => {
    fbservice.updatePost(1, { title: "another title" }).then((data) => {
      const newPosts = this.state.posts.map((el) => {
        if (el.id == data.id) {
          return data;
        }
        return el;
      });
      this.setState({
        posts: newPosts,
      });
    });
  };

  deletePost = (id) => {
    fbservice
      .deletePost(id)
      .then((data) => {
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
    const newStart = this.state.start + this.state.limit;
    this.setState({
      start: newStart,
    });
    fbservice.getPosts(newStart, this.state.limit).then((data) => {
      this.setState({
        posts: [...this.state.posts, ...data],
        hasMore: data.length < this.state.limit ? false : true,
      });
    });
  };
}
