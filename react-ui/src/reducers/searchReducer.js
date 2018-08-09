import { GET_RESULTS } from "../actions/types";

const initialState = {
  query: null,
  userType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESULTS:
        return {
            ...state,
          query: action.payload,
          userType: action.payload
        }
    default:
      return state;
  }
}
