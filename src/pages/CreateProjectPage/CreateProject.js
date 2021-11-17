import React from 'react'

import withHeader from '../../hocs/withHeader'
import InputField from '../../components/InputField'
import StolenSearchBar from './StolenSearchBar'
const CreateProject = () => {
  const [input, setInput] = React.useState('')
  const [tags, setTags] = React.useState([])

  console.log({ tags })
  return (
    <div className="w-full flex flex-col items-center p-6" data-cy="container">
      <div
        data-cy="content"
        className="w-4/5 h-full rounded-xl bg-white shadow-lg flex flex-col items-center p-4 pt-8"
      >
        <h1> Create Project</h1>
        <div
          data-cy="forms-container"
          className="w-1/2 flex flex-col items-start"
        >
          <InputField
            value={input}
            setValue={setInput}
            placeholder="Project name"
          />
          <h3> Tag List </h3>
          <StolenSearchBar
            placeholder="Search for Music, Authors, and Tags."
            value={tags}
            setValue={setTags}
          />
          <InputField
            value={input}
            setValue={setInput}
            placeholder="Project Description"
            isTextArea
          />
        </div>
      </div>
    </div>
  )
}

export default withHeader(CreateProject)
