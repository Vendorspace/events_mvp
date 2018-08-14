import axios from "axios";

import {
  GET_RESULTS
} from "./types";

//get search results
export const getResults = (queryData) => dispatch => {
  var userType = queryData;
  axios
    .get(`/api/search/usersList/${userType}`)
    .then(res =>
      dispatch({
        type: GET_RESULTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESULTS,
        payload: {}
      })
    );
};

