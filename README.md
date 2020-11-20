This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Duc's section:

## How did I initialize this?

Mostly follow: 
  1. https://itnext.io/how-to-use-tailwind-css-with-react-16e9d478b8b1
  2. https://medium.com/@harryhedger/quick-how-to-setup-tailwind-with-create-react-app-6e7af96ad32c


# React's default section:
## Available Scripts

In the project directory, you can run:

### `npm install`
Some libraries won't be included in the commit. Use `npm install` to install the library in package.json if there is any missing library error.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

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

### `npm build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Deploy to Jira

Run the `localhost:3000` port by using `npm`
then run the `ngrok http 3000` in the terminal
After that, get the second URL from the forwarding section (for example like `https://4176ee25.ngrok.io`)
Then copy and paste the URL to the base URL from the `atlassian-connect.json` file under public folder ( ex: `"baseUrl": "https://4176ee25.ngrok.io"`)
Remember to change the project key in the `atlassian-connect.json`also to match with your project key under `webItems` and `webPanels` 
Then go to the `Manage apps` on Jira under `Apps` section and upload your application by gettingg the URL from the forwarding section and add `/atlassian-connect.json` next to it like this `https://4176ee25.ngrok.io/atlassian-connect.json` and upload
The `Jama Plugin` should be on the sidebar or under the `Apps` section on Jira after uploaded it sucessfully 

