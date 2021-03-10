import { connect } from "react-redux";
import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Page404, Login, SignUp } from "./";
import PropTypes from "prop-types";
import { authenticate } from "../actions/auth";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);
      console.log("user", user);
      this.props.dispatch(
        authenticate({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts } = this.props;
    console.log("PROPS:", this.props);
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/signup" component={SignUp} />;
            <Route path="/login" component={Login} />;
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
