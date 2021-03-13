import { connect } from "react-redux";
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Page404, Login, SignUp, Settings } from "./";
import PropTypes from "prop-types";
import { authenticate } from "../actions/auth";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import UserProfile from "./UserProfile";
import { fetchUserFriends } from "../actions/friends";

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();

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
      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
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
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedIn={auth.isLoggedIn}
                  />
                );
              }}
            />
            <Route path="/signup" component={SignUp} />;
            <Route path="/login" component={Login} />;
            <PrivateRoute
              path="/setting"
              component={Settings}
              isLoggedIn={auth.isLoggedIn}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedIn={auth.isLoggedIn}
            />
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
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
