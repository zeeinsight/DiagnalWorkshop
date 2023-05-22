import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContents, setSearchQuery } from "./actions";
import { Grid, Row, Col } from "react-flexbox-grid";
import searchIcon from "./search.png";
import backIcon from "./Back.png";
import navBarImage from "./nav_bar.png";
import placeholderImage from "./placeholder_for_missing_posters.png";

const ContentListingPage = () => {
  const dispatch = useDispatch();
  const { contents, searchQuery } = useSelector((state) => state);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // Fetch initial content on component mount and when the currentPage changes
  useEffect(() => {
    dispatch(fetchContents(currentPage));
  }, [dispatch, currentPage]);

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value;
    dispatch(setSearchQuery(query));
  };

  // Filter contents based on search query
  const filteredContents = contents.filter((content) => {
    const title = content?.name ?? "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Handle scroll event to load more content when user is close to the bottom
  useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF";

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20; // Check if user is close to the bottom
      setIsScrolled(window.pageYOffset > 0);

      // Load next page of content if not searching, not loading, and not on the last page
      if (isAtBottom && !isSearchOpen && !isLoading && !isLastPage) {
        setIsLoading(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      document.body.style.backgroundColor = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearchOpen, isLoading, isLastPage]);

  // Reset isLoading state when contents change
  useEffect(() => {
    setIsLoading(false);
  }, [contents]);

  // Determine if it is the last page based on currentPage
  useEffect(() => {
    setIsLastPage(currentPage >= 3); // Assuming the last page is 3
  }, [currentPage]);

  // CSS styles
  const gridItemStyles = {
    width: "100%",
    marginBottom: "1.5rem",
    "@media (minwidth: 576px)": {
      width: "calc(50% - 15px)",
      marginBottom: "30px",
    },
    "@media (minWidth: 768px)": {
      width: "calc(33.33% - 20px)",
    },
  };

  const imageStyles = {
    width: "100%",
    height: "auto",
  };

  const titleStyles = {
    color: "#DDDDDD",
    margin: "2px 0px 0px 0px",
    fontSize: "14px",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const containerStyles = {
    width: "375px",
    height: "667px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#171717",
  };

  const mainColor = {
    backgroundColor: "#171717",
  };

  const titleAndArrowStyles = {
    display: "flex",
    alignItems: "center",
  };

  const headerStyles = {
    position: "sticky",
    top: "0",
    left: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundImage: isScrolled ? ` url(${navBarImage})` : "none",
    backgroundColor: isScrolled ? "transparent" : "rgb(23, 23, 23)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    zIndex: "999",
  };

  const backIconStyles = {
    width: "1.2rem",
    height: "1.2rem",
    cursor: "pointer",
  };

  const searchIconStyles = {
    width: "1.2rem",
    height: "1.2rem",
    cursor: "pointer",
  };

  const searchInputStyles = {
    width: "80%",
    height: "0.6rem",
    padding: "0.5rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "4px",
    border: "1px solid #CCCCCC",
    fontStyle: searchQuery ? "normal" : "italic",
  };

  const titleStyles2 = {
    color: "#FFFFFF",
    margin: "0px 0px 0px 10px",
    fontSize: "18px",
  };

  // Handle click event for search icon
  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    dispatch(setSearchQuery("")); // Reset search query when closing the search
  };

  // Handle click event for back button
  const handleBackButtonClick = () => {
    setIsSearchOpen(false);
    dispatch(setSearchQuery("")); // Reset search query when closing the search
  };

  const searchHint = "Search...";

  return (
    <div style={containerStyles} className="text-gray-500">
      <main style={mainColor} className="p-4 mt-16 overflow-y-auto">
        <header style={headerStyles}>
          {isSearchOpen ? (
            <>
              <img
                src={backIcon}
                alt="Back"
                style={backIconStyles}
                className="mr-2"
                onClick={handleBackButtonClick}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                style={searchInputStyles}
                placeholder={searchHint}
                autoFocus // Add the autoFocus attribute here
              />
            </>
          ) : (
            <div style={titleAndArrowStyles}>
              <img
                src={backIcon}
                alt="Back"
                style={backIconStyles}
                className="mr-2"
              />
              <span style={titleStyles2} className="text-white font-bold">
                Romantic Comedy
              </span>
            </div>
          )}
          <img
            src={searchIcon}
            alt="Search"
            style={searchIconStyles}
            onClick={handleSearchIconClick}
          />
        </header>
        <Grid fluid>
          <Row>
            {filteredContents.map((content, index) => (
              <Col xs={4} sm={4} md={4} lg={4} key={`${content.name}-${index}`}>
                <div style={gridItemStyles} className="p-4 bg-gray-200 rounded">
                  <img
                    src={content["poster-image"] || placeholderImage}
                    alt={content.name}
                    style={imageStyles}
                    className="w-full mb-2"
                  />
                  <p style={titleStyles} className="font-bold">
                    {content.name}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Grid>
        {isLoading && (
          <p style={{ color: "#FFFFFF", textAlign: "center" }}>Loading...</p>
        )}
        {isLastPage && (
          <p style={{ color: "#FFFFFF", textAlign: "center" }}>
            No more content to load.
          </p>
        )}
      </main>
    </div>
  );
};

export default ContentListingPage;
