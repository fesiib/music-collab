import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import App from "./App";
import ProjectPage from './pages/ProjectPage';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/project/:projectId" component={ProjectPage} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;