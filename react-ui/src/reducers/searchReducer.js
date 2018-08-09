import { GET_RESULTS } from "../actions/types";

const initialState = {
  query: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESULTS:
        return {
            ...state,
            loading: true
        }
    default:
      return state;
  }
}
