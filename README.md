# Project K

Project K is a web-app for managing properties/tenants/maintenance requests like http://activebuilding.com. Our original goal is to provide an easy to use app for kos-kosan in Indonesia to manage their tenants, keep track of maintenance requests, and provide payment portal for easy rent transaction.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Technologies used:
- React
- Styled Components
- Redux
- Redux Form
- Thunk
- Axios
- Material UI

If I were to redo this project again, I would still use React but maybe rethink if I want to use Redux again. I find that writing Redux code is too verbose unless I am dealing with very complex local states. Between actions, reducers, and API files it is just way too much code just to add an API into the project. I will probably look into using Mobx or just use Sessions in the future as a replacement of Redux. Redux Form is also interesting since I think it was well made, but its reliance to Redux is disappointing. Along the way I also fell in love with styled components and how it provides a way for us to inject CSS as React components.

Anyway, the project ended in March 2020 since we did not find traction in demand of the product. Feel free to use this code or use it as an example project to learn more about the many libraries used in this project :)

Link to the back-end Golang project: https://github.com/obedtandadjaja/project_k_backend

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
