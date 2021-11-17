import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import withHeader from '../../hocs/withHeader'
import InputField from '../../components/InputField'
import StolenSearchBar from './StolenSearchBar'
import OneTrack from '../../components/OneTrack'
import GenericButton from '../../components/GenericButton'
import { getFileURL, uploadFile } from '../../services/storage'
import { addProject } from '../../reducers/database'
import { useHistory } from 'react-router'

const INSTRUMENTS = ['Piano', 'Guitar', 'Bass', 'Drums']

const CreateProject = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [trackNames, setTrackNames] = useState([])
  const [instrument, setInstrument] = useState('guitar')

  const fileInputRef = useRef()

  const addTrackToList = (newTrack) => {
    console.log('adding track to the list', newTrack)
    setTrackNames([...trackNames, { name: newTrack, type: instrument }])
  }

  const handleFileUpload = (event) => {
    const file = fileInputRef.current.files[0]
    console.log({
      'uploaded file': file
    })
    uploadFile(file, addTrackToList)
  }

  const updateTrackLink = useCallback(
    (index, newLink, track) => {
      const trackNamesCopy = trackNames
      trackNamesCopy[index] = {
        ...track,
        url: newLink
      }
      setTrackNames(trackNamesCopy)
    },
    [setTrackNames, trackNames]
  )

  useEffect(() => {
    trackNames.forEach((track, index) => {
      getFileURL(track.name, (url) => updateTrackLink(index, url, track))
    })
  }, [trackNames, updateTrackLink])

  const handleCreateProject = () => {
    dispatch(
      addProject({
        ownerId: 'helena',
        tracks: trackNames,
        trackTitle: name,
        description,
        tags
      })
    )
    history.push('/homepage')
  }

  console.log({
    ownerId: 'helena',
    tracks: trackNames,
    trackTitle: name,
    description,
    tags
  })
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
            value={name}
            setValue={setName}
            placeholder="Project name"
          />
          <h3> Tag List </h3>
          <StolenSearchBar
            placeholder="Search for Music, Authors, and Tags."
            value={tags}
            setValue={setTags}
          />
          <InputField
            value={description}
            setValue={setDescription}
            placeholder="Project Description"
            isTextArea
          />
          <div
            data-cy="tracks-container"
            className="w-full flex flex-col rounded-2xl mx-auto bg-gray-300 p-3 gap-3 my-5"
          >
            {trackNames.map((track) => {
              console.log('inside map function, track link', track)

              return <>{track.url && <OneTrack audioUrl={track.url} />}</>
            })}

            <div data-cy="buttonsContainer">
              <select
                value={instrument}
                onChange={(e) => {
                  console.log('value', e.target.value)
                  setInstrument(e.target.value)
                }}
                className="w-20 rounded-md text-center text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600 mr-4"
              >
                {INSTRUMENTS.map((curInstrument) => (
                  <option value={curInstrument}> {curInstrument}</option>
                ))}
              </select>
              <GenericButton
                title={'Add track'}
                className="w-max"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                onChange={handleFileUpload}
                multiple={false}
                ref={fileInputRef}
                type="file"
                accept=".mp3,"
                hidden
              />
            </div>
          </div>
          <GenericButton
            title={'Create Project'}
            className="w-max self-end"
            onClick={handleCreateProject}
          />
        </div>
      </div>
    </div>
  )
}

export default withHeader(CreateProject)
