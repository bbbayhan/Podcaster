## Frontend Interview - Podcast Application

This application has been developed for listening to music podcasts. The application has three views: the main view where the list of the all podcasts you can filter, details of a podcast, and details of a podcast episode. The application is a Single Page Application, thereby ensuring that all navigation occurs on the client side.

The application architecture is represented in the following format:

1. Components - User interface components that are utilized for the three views of the application.
2. Domain - Core of the application where it is defined the business entities and service contracts.
3. Fixtures - Fixtures used to build the views before establishing API connections.
4. Hooks - Debounce hook for API calls, Podcast and PodcastDetail hooks where the data is fetched using the services.
5. Infrastructure - Responsible for implementing the service and storage contracts defined in the domain layer.
6. Services - The classes responsible for making fetch calls to the APIs.
7. Utils - Helpers to format date and minutes.

### Prerequisites

- Node.js version 14.17.6 or higher installed on your local machine.
- npm version 6.14.15 or higher installed on your local machine.

### Installing and how to run

- Run command: `npm install && npm run dev`

### Running the test

- Run command: `npm run test`

### Used Tecnologies

In order to maintain the project's quality, the following libraries are utilized efficiently with an effort to minimize dependencies.

- `react`: JavaScript library for building user interfaces.
- `react-dom`: Provides DOM-specific methods that can be used with React.
- `react-router-dom`: Provides client-side routing for React applications.
- `typescript`: Superset of JavaScript that provides optional static typing.
- `vite`: Used as a build tool and development server.
- `vitest` and `testing-library`: Testing React components, hooks and services.
- `eslint`: The config that helps catch common coding errors and style issues.
- `prettier`: The config is default and integrated with eslint and helps enforce consistent code style.
- `sass`: This is a CSS preprocessor that extends the capabilities of CSS.
- `ts-mockito`: Used for infrastructure and services tests.

### Features

- Typescript has been implemented to enhance the reliability of the code, catch errors at compile-time, and ultimately reduce the number of bugs in the project.
- The React-router library's new version has been employed for router configuration (`createBrowserRouter`).
- React Hooks have been utilized for service calls and debounce has been employed when filtering the podcast list to avoid re-rendering.
- The components have been styled with SCSS to help reduce repetition in CSS code and make it easier to scale and maintain stylesheets.
- The lazy function of React has been utilized for lazy loading of components, loading them only when they are required.
- A simple message is displayed when no podcasts are found.
- Responsive design principles have been employed.
- It is employed Vitest and Testing Library to write unit tests to verify the UI elements. In addition, integration tests have been performed for hooks and services.

### To-do list

- Improve performance when loading data.
- Create Value-Objects for Podcast and Podcast Detail entities.
