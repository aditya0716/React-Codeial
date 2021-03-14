import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../actions/auth";
import { searchUsers } from "../actions/search";

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;
    this.props.dispatch(searchUsers(searchText));
  };

  render() {
    const { auth, results } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" onChange={this.handleSearch} />

          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => (
                  <Link to={`/user/${user._id}`}>
                    <li className="search-results-row" key={user._id}>
                      <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                      />
                      <span>{user.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {auth.isLoggedIn && (
            <div className="user">
              <Link to="/setting">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedIn && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedIn && <li onClick={this.logOut}>Log out</li>}

              {!auth.isLoggedIn && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}
export default connect(mapStateToProps)(Navbar);
