import React, { Component } from "react";
import fbservice from "../../api/fbService";

import Button from "@material-ui/core/button";
import Post from "../../components/Post/Post";

import "./Posts.scss";

export default class Posts extends Component {
  state = {
    posts: [],
    start: 0,
    limit: 4,
    hasMore: true,
  };

  render() {
    return (
      <>
        <div className="app-posts__buttons">
          <Button onClick={() => this.createPost()}>Create Post</Button>
          <Button onClick={() => this.pushPosts()}>Reset original posts</Button>
        </div>
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
                    remove={() => this.deletePost(el.id)}
                    />
                    {'--'+el.id+'--'}
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
    fbservice
      .getPosts(this.state.start, this.state.limit)
      .then((data) => {
        this.setState({
          posts: data,
        });
      })
      .catch((err) => {
        console.log("Caught an error : ", err);
      });
  }

  pushPosts = () => {
    fbservice.pushPosts()
  }

  createPost = () => {
    fbservice
      .createPost({
        title: "some title",
        body: "some body",
        userId: 1,
      })
      .then(data => {
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
    const {start, limit, posts} = this.state
    const newStart = start + limit + 1;
    this.setState({
      start: newStart,
    })
    
    fbservice.getPosts(start, start + limit)
    .then((data) => {
      this.setState({
        posts: [...posts, ...data],
        hasMore: data.length < limit ? false : true,
      });
    })
  
  };
}
