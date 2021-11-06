import React from 'react'

import withHeader from '../hocs/withHeader'

const ProjectPage = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center">
      Hello from project page
    </div>
  )
}

export default withHeader(ProjectPage)
