export const FETCH_CONTENTS = "FETCH_CONTENTS";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

export const fetchContents = (page) => {
  return (dispatch) => {
    fetch(`/CONTENTLISTINGPAGE-PAGE${page}.json`)
      .then((response) => response.json())
      .then((data) => {
        const contents = data.page["content-items"].content;
        dispatch({ type: FETCH_CONTENTS, payload: contents, page });
      })
      .catch((error) => {
        console.error("Error fetching contents:", error);
      });
  };
};

export const setSearchQuery = (query) => {
  return { type: SET_SEARCH_QUERY, payload: query };
};
