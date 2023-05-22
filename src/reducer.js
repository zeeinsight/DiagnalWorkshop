import { FETCH_CONTENTS, SET_SEARCH_QUERY } from "./actions";

// Initial state of the reducer
const initialState = {
  contents: [],
  searchQuery: "",
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENTS:
      // Concatenate the fetched contents with existing contents if it's not the first page
      const updatedContents =
        action.page === 1
          ? action.payload
          : [...state.contents, ...action.payload];

      return {
        ...state,
        contents: updatedContents,
      };
    case SET_SEARCH_QUERY:
      // Update the searchQuery state with the new query
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      // Return the current state if the action type doesn't match any case
      return state;
  }
};

export default reducer;
