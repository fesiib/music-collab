import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App'
import ProjectPage from './pages/projectPage/ProjectPage'
import Homepage from './pages/Homepage'
import VersionPage from './pages/VersionPage'
import CreateProject from './pages/CreateProjectPage/CreateProject'
import ContributeContainer from './pages/ContributePage/Contribute.container'

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/homepage" component={Homepage} />
          <Route
            exact
            path="/version/:projectId/:versionId"
            component={VersionPage}
          />
          <Route exact path="/create_project" component={CreateProject} />
          <Route exact path="/contribute/:projectId/:versionId" component={ContributeContainer} />
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
