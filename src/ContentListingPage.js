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

  useEffect(() => {
    dispatch(fetchContents(currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = (event) => {
    const query = event.target.value;
    dispatch(setSearchQuery(query));
  };

  const filteredContents = contents.filter((content) => {
    const title = content?.name ?? "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF";

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20; // Check if user is close to the bottom
      setIsScrolled(window.pageYOffset > 0);

      if (isAtBottom && !isSearchOpen && currentPage < 3 && !isLoading) {
        setIsLoading(true);
        setCurrentPage((prevPage) => prevPage + 1); // Load next page of data
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.body.style.backgroundColor = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearchOpen, currentPage, isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [contents]);

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

  const titleAndArrow = {
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
  };

  const searchIconStyles = {
    width: "1.2rem",
    height: "1.2rem",
  };

  const searchInputStyles = {
    width: "80%",
    height: "0.6rem",
    padding: "0.5rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "4px",
    border: "1px solid #CCCCCC",
  };

  const titleStyles2 = {
    color: "#FFFFFF",
    margin: "0px 0px 0px 10px",
    fontSize: "18px",
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    dispatch(setSearchQuery("")); // Reset search query when closing the search
  };

  const handleBackButtonClick = () => {
    setIsSearchOpen(false);
    dispatch(setSearchQuery("")); // Reset search query when closing the search
  };

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
                placeholder="Search..."
              />
            </>
          ) : (
            <div style={titleAndArrow}>
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
      </main>
    </div>
  );
};

export default ContentListingPage;
