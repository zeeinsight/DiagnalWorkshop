# Content Listing Page - ReactJS Workshop

Test v2.0
Reactjs Workshop
DIAGNAL Technologies Pvt Ltd

## Project Description
This project is part of a ReactJS workshop conducted by DIAGNAL Technologies Pvt Ltd. The goal of the workshop is to develop a mobile browser version of the content listing page using ReactJS with Redux for state management. The project focuses on implementing lazy loading of contents, client-side search functionality, and monitoring virtual DOM rendering to optimize performance.

## LIVE DEMO
This project is deployed to GH Pages for LIVE DEMO. Checkout the below link
https://zeeinsight.github.io/DiagnalWorkshop/

## Release Notes

Version 1.0.0

1. Initial release of the ContentListingPage component.
2. Fetches and displays content from an external API based on the current page.
3. Implements search functionality to filter the displayed content based on a search query.
4. Implements infinite scrolling to load more content when the user reaches the bottom of the page.
5. Displays loading indicator while fetching new content.
6. Displays a message when there is no more content to load.
7. Provides a responsive layout using the react-flexbox-grid library.
8. Uses custom styles for various elements, including the header, search input, and content grid items.
9. Includes back and search icons for user interaction.
10. Supports sticky header with dynamic styling based on scrolling.
11. Maintains the search query and search state when closing and opening the search input.
12. Displays a placeholder image when the poster image is not available.
13. Ensures consistent visual styling with a dark color scheme.
14. Maintains state using React hooks (useState, useEffect).
15. Utilizes Redux for state management, dispatching actions to fetch content and update the search query.
16. Implements a reducer to handle the dispatched actions and update the state accordingly.

Note: This release includes the initial version of the ContentListingPage component and related actions and reducer. Further improvements and enhancements may be added in future releases.



## Getting Started

To run the application locally, follow these steps:

1. Clone the repository: git clone <repository-url>

2. Install the dependencies: npm install

3. Start the development server: npm start



The application will be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project consists of the following files and directories:

- `ContentListingPage.js`: The main component that renders the content listing page.
- `actions.js`: Contains Redux action creators for fetching contents and setting search queries.
- `reducer.js`: Redux reducer for managing the state of the application.
- `index.js`: Entry point of the application that renders the main `App` component.
- `App.js`: `App` includes the ContentListingPage component
- `App.css`: CSS file containing styles for the application.
- `package.json`: Contains the project's metadata and dependencies.

## Dependencies

The project relies on the following dependencies:

- React: A JavaScript library for building user interfaces.
- React DOM: Provides methods for rendering React components in the DOM.
- React Redux: Official React bindings for Redux.
- Redux: A predictable state container for JavaScript applications.
- Redux Thunk: Middleware for Redux that allows writing async logic.
- react-flexbox-grid: A grid system based on flexbox for responsive layouts.
- react-scripts: Scripts and configuration for React app development.
- Tailwind CSS: A utility-first CSS framework.
- Other testing and development dependencies.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Starts the development server.
- `npm build`: Builds the app for production.
- `npm test`: Runs tests using the test runner.
- `npm eject`: Ejects the create-react-app configuration.

## Contributing

Contributions to the project are welcome. Before submitting a pull request, please ensure that your code follows the project's coding style and conventions.

## License

This project is licensed under the [MIT License](LICENSE).




