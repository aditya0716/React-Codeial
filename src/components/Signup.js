import React, { Component } from "react";
import { signUp, startSignUp } from "../actions/auth";
import { connect } from "react-redux";
class Signup extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("EMAIL:", this.emailInputRef);
    // console.log("PASSWORD:", this.passwordInputRef);
    console.log("STATE:", this.state);
    const { email, password, confirmPassword, name } = this.state;

    if (email && password && confirmPassword && name) {
      this.props.dispatch(startSignUp());
      this.props.dispatch(signUp(email, password, confirmPassword, name));
    }
  };

  handleInputChange = (input, value) => {
    this.setState({
      [input]: value,
    });
  };

  render() {
    const { error, inProgress } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            required
            //ref={this.emailInputRef}
            onChange={(e) => this.handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            //ref={this.emailInputRef}
            onChange={(e) => this.handleInputChange("email", e.target.value)}
          />
        </div>

        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            //ref={this.passwordInputRef}
            onChange={(e) => this.handleInputChange("password", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            //ref={this.passwordInputRef}
            onChange={(e) =>
              this.handleInputChange("confirmPassword", e.target.value)
            }
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit} disabled={inProgress}>
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Signup);
