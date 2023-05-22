// Action Types
export const FETCH_CONTENTS = "FETCH_CONTENTS";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

// Action Creator - fetchContents
export const fetchContents = (page) => {
  return (dispatch) => {
    // Fetch data from API
    fetch(
      `https://gist.githubusercontent.com/zeeinsight/c6975d23c1de37ab8296d4a3259d7f4f/raw/904ce7bbf1c9e9b2eecec6610a6227fc2a706acd/CONTENTLISTINGPAGE-PAGE${page}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract contents from response data
        const contents = data.page["content-items"].content;
        // Dispatch action with contents and page number
        dispatch({ type: FETCH_CONTENTS, payload: contents, page });
      })
      .catch((error) => {
        console.error("Error fetching contents:", error);
      });
  };
};

// Action Creator - setSearchQuery
export const setSearchQuery = (query) => {
  return { type: SET_SEARCH_QUERY, payload: query };
};
