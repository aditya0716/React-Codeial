import { connect } from "react-redux";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Page404, Login } from "./";
import PropTypes from "prop-types";

const SignUp = () => <div>Sign-Up</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    console.log("PROPS:", this.props);
    return (
      <Router>
        <div>
          <Navbar />
          {/*<PostsList posts={posts} />*/}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
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
