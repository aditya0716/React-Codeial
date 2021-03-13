import React, { Component } from "react";
import { PostsList, FriendsList } from "./";
class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn } = this.props;
    console.log(this.props);
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedIn && <FriendsList friends={friends} />}
      </div>
    );
  }
}

export default Home;
