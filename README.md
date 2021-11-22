# High-Fi Prototype

## Prototype

- Prototype URL: [https://music-collab-9ec47.web.app/](https://music-collab-9ec47.web.app/)
    - Hosted by Firebase
- Repo URL: [https://github.com/fesiib/music-collab](https://github.com/fesiib/music-collab)
- Libraries and frameworks
    - React
    - React-Redux, Persist
    - TailwindCSS
    - React-Router-DOM
    - Firebase
    - React-Select
    - React-Tab
    - React-Sliding-Panel

## Instructions & User Interface

### Reseting the webpage

Go to [https://music-collab-9ec47.web.app/prototype](https://music-collab-9ec47.web.app/prototype) to reset the webpage to its initial state. Might be needed to startover or if you encounter some weird issues.

![Figure 1, Homepage](https://github.com/fesiib/music-collab/blob/main/README_images/Screen_Shot_2021-11-18_at_10.33.20_PM.png)

Figure 1, Homepage

![Figure 2, Homepage - with sidebar](https://github.com/fesiib/music-collab/blob/main/README_images/Screen_Shot_2021-11-18_at_10.39.19_PM.png)

Figure 2, Homepage - with sidebar

Homepage (Figure 1) is starting page for all users, where they will be able to see a list of projects created by them in "My Studio Tab", and also browse and search for other people's projects in "Browse Tab". The homepage includes a sidebar (Figure 2), which allows users to explore more about the project, different versions, etc. Also, users can go to the "Project Page" from the sidebar.  

![Figure 3, Project page](https://github.com/fesiib/music-collab/blob/main/README_images/Screen_Shot_2021-11-18_at_9.44.09_PM.png)

Figure 3, Project page

The "Project Page" (Figure 3, above) includes different versions of one project in a unique Version Tree, which shows what kind of versions with tracks are added by collaborators to the project. By clicking one of the versions in the Version Tree, which will open the "Version Page" (Figure 4, below), the user can explore and analyze that version in order to think about possible directions for the development of that version and project overall.

![Figure 4, Version page](https://github.com/fesiib/music-collab/blob/main/README_images/Screen_Shot_2021-11-18_at_22.04.55.png)

Figure 4, Version page

After exploring a specific version in the Version Page (Figure 4), listening to the track, and analyzing comments and thoughts given by other musicians, users can start contributing to the project by clicking contribute button, or leaving their thoughts and feedback about the version and upvote/downvote it. 

![Figure 5, Contribution page](https://github.com/fesiib/music-collab/blob/main/README_images/Screen_Shot_2021-11-18_at_22.39.23.png)

Figure 5, Contribution page

On the "Contribution Page" (Figure 5), users can add new tracks to the existing project. To do that they need to write a contribution message describing the new track and upload the track itself. 

![Figure 6, Create Project page](https://github.com/fesiib/music-collab/blob/main/README_images/create_project.png)

Figure 6, Create Project page

If users want to create a project, they can do it using "Create Project Page" shown in figure 6. After that, the project will be available for other people to view and contribute to on the Homepage. It will have a similar tree of versions as in Figure 3. Other users will be able to find information about its versions through the "Version Page" (Figure 4) and contribute something new to it on the "Contribute Page" (Figure 5).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
