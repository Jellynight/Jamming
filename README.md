# MySpotify web application
## Development Ongoing
### This web app needs Spotify Premium account

For anyone apart from myself wanting to use this application you need for me to include your email to the list of users. Max of 5 users. 

### Client Secret
The client secret was not included in this repository but in my local env files for security reasons. You can create your own client secret by creating a Spotify account and adding the application to it and get your own client secret to use.  

### Why create this App?
This web app is setup using [Create React App](https://github.com/facebook/create-react-app) and uses react claas components. It was a project through the Full Stack Developer certification from Learning People. This project taught me about creating API requests and handling the response. 

## OAuth code flow
For the app to work I had to use authorization code flow with PKCE. The flow starts with the creating of a code verifier/random string generator then hash the string using the SHA256 algorithm. Next I implement a function base64encode that returns the base64 representation of the digest we just calculated with the SHA256 function. Then I request authorization ("GET") with the client id, response type, code challenge method, calculated code challenge, redirect URI, state, headers set. The response I get back is a authorization code I now use to make another request ("POST") for an access token that is done after the redirect in the callback function. The callback function handles the token request after the redirect then uses the accsess token from the response to grab user information and handle future API requests. Now the user is authenticated you can search songs, edit and create playlists.        

Dependencies Used:
- React
- React-Redux



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
