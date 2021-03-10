import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "./actionTypes";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", //in case of json api's this line not required
      },
      body: getFormBody({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA-", data);
        if (data.success) {
          //dispatch action to save user
          localStorage.setItem("token", data.data.token);
          dispatch(loginSuccess(data.data.user));

          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function authenticate(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function startSignUp() {
  return {
    type: SIGNUP_START,
  };
}

export function signUpFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

export function signUpSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signUp(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = APIUrls.signUp();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", //in case of json api's this line not required
      },
      body: getFormBody({
        email: email,
        password: password,
        confirm_password: confirmPassword,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA-", data);
        if (data.success) {
          //dispatch action to save user
          localStorage.setItem("token", data.data.token);
          dispatch(signUpSuccess(data.data.user));

          return;
        }
        dispatch(signUpFailed(data.message));
      });
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
