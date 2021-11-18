import React from 'react'
// import VersionPage from './VersionPage'

import VersionPage from '../../pages/VersionPage'

import { useDispatch, useSelector } from 'react-redux';
import { pauseTracks, playTracks } from '../../reducers/musicTracks';


const DimmedBackground = ({ children }) => {
  return (
    <div className="bg-gray-200 bg-opacity-80 h-screen w-screen z-0 top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  )
}

const CenteredContent = ({ children }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  )
}

const Container = ({ children }) => {
  return (
    <div
      className="h-5/6 flex flex-col align-center rounded-lg shadow-md bg-white"
      style={{ height: '720px', width: '1020px' }}
    >
      {children}
    </div>
  )
}

const VersionModal = ({ onClose }) => {
  const versionId  = "sunnyDay1"
  const projectId = "sunnyDay"

  const dispatch = useDispatch();

  
  return (
    <DimmedBackground>
      <CenteredContent>
        <Container>
          <button
            onClick={() => {
              dispatch (pauseTracks());
              
              onClose();
            }}
            className="bg-blue-400 text-black h-7 w-20 self-end"
          >
            Close
          </button>
          
          <VersionPage
            description={'This is my contribution'}
            contributor={{ name: 'Alan Zhui', lastUpdate: '2 weeks ago' }}
            versionId  = {versionId}
            projectId = {projectId}
          />

        </Container>
      </CenteredContent>
    </DimmedBackground>
  )
}

export default VersionModal
