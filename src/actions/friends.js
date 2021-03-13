import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_FRIEND_SUCCESS, ADD_FRIEND, REMOVE_FRIEND } from "./actionTypes";

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFiends(userId);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("EDIT--data", data);
        if (data.success) {
          dispatch(fetchFriendSuccess(data.data.friends));
          return;
        }
      });
  };
}

export function fetchFriendSuccess(friends) {
  return {
    type: FETCH_FRIEND_SUCCESS,
    friends,
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
