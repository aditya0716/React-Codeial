import React, { Component } from "react";
import { PostsList } from "./";
class Home extends Component {
  render() {
    const { posts } = this.props;
    console.log(this.props);
    return (
      <div className="Home">
        <PostsList posts={posts} />
      </div>
    );
  }
}

export default Home;
