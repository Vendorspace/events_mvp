import axios from "axios";

import {
  GET_SEARCH_RESULTS
} from "./types";

//get current profile
export const getSearchResults = ( query ) => dispatch => {
  axios
    .get(`/api/search/usersList/${query}`)
    .then(res =>
      dispatch({
        type: GET_SEARCH_RESULTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SEARCH_RESULTS,
        payload: {}
      })
    );
};

// // create profile

// export const createProfile = (profileData, \) => dispatch => {
//   axios
//     .post("/api/profile", profileData)
//     .then(res => history.push("/dashboard"))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// //profile loading
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };

// //clear profile
// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_PROFILE
//   };
// };

// //Delete account and profile

// export const deleteAccount = () => dispatch => {
//   if (window.confirm("Are you sure? This can NOT be undone")) {
//     axios
//       .delete("/api/profile")
//       .then(res =>
//         dispatch({
//           type: SET_CURRENT_USER,
//           payload: {}
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   }
// };