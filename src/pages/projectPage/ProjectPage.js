import React from 'react'

import withHeader from '../../hocs/withHeader'
import VersionModal from './VersionModal'

const ProjectPage = ({
  name,
  description,
  author,
  collaborators,
  versions
}) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <div className="w-full flex flex-col items-center p-6" data-cy="container">
      <div
        data-cy="content"
        className="w-4/5 h-full rounded-xl bg-white shadow-lg flex flex-col items-center p-4 pt-8"
      >
        <h1>{name}</h1>
        <h3 className="mt-4">{description}</h3>
        <div className="mt-4 flex flex-col items-start">
          <h2>By {author}</h2>
          <h3>Collabotors: {collaborators}</h3>
          <h3>Versions: {versions} </h3>
        </div>
        <button
          onClick={() => setVisible((prevState) => !prevState)}
          className="bg-blue-400 text-white"
        >
          Open Modal
        </button>
      </div>
      {visible && <VersionModal onClose={() => setVisible(false)} />}
    </div>
  )
}

export default withHeader(ProjectPage)
