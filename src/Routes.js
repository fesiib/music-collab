import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import App from "./App";
import Homepage from './pages/Homepage';
import ProjectPage from './pages/ProjectPage';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/project/:projectId" component={ProjectPage} />
                    <Route exact path="/homepage" component={Homepage} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;