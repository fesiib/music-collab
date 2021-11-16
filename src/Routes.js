import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import App from "./App";
import Homepage from './pages/Homepage';
import ProjectPage from './pages/ProjectPage';
import VersionPage from './pages/VersionPage'
class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/project/:projectId" component={ProjectPage} />
                    <Route exact path="/homepage" component={Homepage} />
                    <Route exact path="/version/:projectId/:versionId" component={VersionPage} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;