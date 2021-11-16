import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App'
import ProjectPage from './pages/projectPage/ProjectPage'
import Homepage from './pages/Homepage';
import VersionPage from './pages/VersionPage';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/version/:projectId/:versionId" component={VersionPage} />
          <Route
            exact
            path="/project/:projectId"
            component={() => (
              <ProjectPage
                {...{
                  name: 'A Tender Heart',
                  description:
                    'Light and dreamy, with kids/ children gentle/ lullaby elements featuring heartfelt piano',
                  author: 'Heidi',
                  collaborators: 7,
                  versions: 13
                }}
              />
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default Routes
