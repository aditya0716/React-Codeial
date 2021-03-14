import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";

export function searchResultSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Search-Data", data);
        if (data.success) {
          dispatch(searchResultSuccess(data.data.users));
        } else {
          dispatch(searchResultSuccess([]));
        }
      });
  };
}
