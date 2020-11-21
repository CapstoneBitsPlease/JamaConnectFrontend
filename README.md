C2TB
====

This repo contains the frontend components for our team's capstone project.

To run locally:
-------

1. Clone the repo and open the directory on your machine.

2. Run the script `npm install` to install all libraries specified in the package.json.

3. Once everything is installed, use `npm start` to run in development mode. 

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser if it doesn't open automatically.

See additional available npm scripts below in React's default section.


To install and test on Jira:
-------

1. Create an Atlassian instance and a project if you do not have one already. You can do this [here](http://go.atlassian.com/cloud-dev).

2. In your instance, enable development mode by clicking **Apps** on the top toolbar, then **Manage apps**. Click **Settings** at the bottom of page, select **Enable development mode**, and click **Apply**.

3. Change the project key in the `url` section of each `module` in the `atlassian-connect.json` file (this is located in the public folder) to match your project key. Your key should look like uppercase letters and numbers (a project key for a project named test-jira-project might be TJP).

4. Use ngrok to make the files available over the internet - open a separate terminal and run `ngrok http <PORT>`. Change `<PORT>` to whichever port the frontend is using. This should open a status page with HTTP and HTTPS URLs. 

5. Copy the HTTPS URL, append `/atlassian-connect.json`, and paste this in your browser to ensure it shows the correct JSON file. 

6. If it looks correct, paste the HTTPS URL (without the appended JSON) into the `baseUrl` section near the top of the `atlassian-connect.json` file.

7. Finally, upload the app - Ensure the frontend and backend are both running. Navigate back to the **Manage your apps** page in Jira, and upload the app by clicking **Upload app** and pasting the full URL (should look something like this: `https://2fb042924b6d.ngrok.io/atlassian-connect.json`). Then click **Upload**.

8. Verify that the app (currently called Jama Connect Plugin) appears in the **User-installed apps** list. A new button to the plugin should be visible under the **Apps** tab on the top toolbar. If you navigate to the **Projects** tab and select the correct project, the plugin should also be visible on the sidebar underneath **Project pages**.



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


Sources:
--------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and generated from a React-Tailwind-Sass template created by [ptmdmusique](https://github.com/ptmdmusique/react-tailwind-sass-template).