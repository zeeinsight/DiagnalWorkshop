export const FETCH_CONTENTS = "FETCH_CONTENTS";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

export const fetchContents = (page) => {
  return (dispatch) => {
    fetch(`https://gist.githubusercontent.com/zeeinsight/c6975d23c1de37ab8296d4a3259d7f4f/raw/904ce7bbf1c9e9b2eecec6610a6227fc2a706acd/CONTENTLISTINGPAGE-PAGE${page}.json`)
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
