import { FETCH_CONTENTS, SET_SEARCH_QUERY } from "./actions";

const initialState = {
  contents: [],
  searchQuery: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENTS:
      return {
        ...state,
        contents:
          action.page === 1
            ? action.payload
            : [...state.contents, ...action.payload],
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
