> ### Fork of [ts-redux-realworld-example-app](https://github.com/angelguzmaning/ts-redux-react-realworld-example-app/blob/59efcd26c75eaadfb4ede15746d3dc946b73e8d5/README.md#L52-L51)

> ### Demonstrates use of [Playwright](https://playwright.dev/) for automated accessibility testing using the [axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright) and [axe-html-reporter](https://www.npmjs.com/package/axe-html-reporter) packages

### Running the accessibility tests - Getting Started  
1. Clone the repository
2. Run `npm install`
3. Run `export NODE_OPTIONS=--openssl-legacy-provider`
4. Run `npm start`
5. In a separate terminal tab/window, run `npm run test:accessibility`

### [Demo](https://react-ts-redux-realworld-example-app.netlify.app/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with React, Typescript, and Redux Toolkit including CRUD operations, authentication, routing, pagination, and more.

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works
The root of the application is the `src/components/App` component. The App component uses react-router's HashRouter to display the different pages. Each page is represented by a [function component](https://reactjs.org/docs/components-and-props.html). 

Some components include a `.slice` file that contains the definition of its state and reducers, which might also be used by other components. These slice files follow the [Redux Toolkit](https://redux-toolkit.js.org/) guidelines. Components connect to the state by using [custom hooks](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook).

This application is built following (as much as practicable) functional programming principles:
* Immutable Data
* No classes
* No let or var
* Use of monads (Option, Result)
* No side effects

The code avoids runtime type-related errors by using Typescript and decoders for data coming from the API.

Some components include a `.test` file that contains unit tests. This project enforces a 100% code coverage.

This project uses prettier and eslint to enforce a consistent code syntax.

## Folder structure
* `src/components` Contains all the functional components.
* `src/components/Pages` Contains the components used by the router as pages.
* `src/state` Contains redux related code.
* `src/services` Contains the code that interacts with external systems (API requests).
* `src/types` Contains type definitions alongside the code related to those types.
* `src/config` Contains configuration files.

# Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
You need to run this command first: `export NODE_OPTIONS=--openssl-legacy-provider`

The page will reload if you make edits.<br />

Note: This project will run the app even if linting fails.

### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
