import React from 'react'
import { useHistory } from 'react-router'
import GenericButton from '../../components/GenericButton'
// import VersionPage from './VersionPage'

import VersionPage from '../../pages/VersionPage'


const DimmedBackground = ({ children }) => {
  return (
    <div className="bg-gray-200 bg-opacity-80 h-screen w-screen z-20 top-1/2 left-1/2 fixed transform -translate-x-1/2 -translate-y-1/2">
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

const VersionModal = ({ onClose,versionId,projectId, fromHomepage=false}) => {
  // const versionId  = "sunnyDay1"
  // const projectId = "sunnyDay"

  const history = useHistory();

  const redirectToProjectPage = () => {
    history.push('/project/' + projectId + '/');
    console.log("modal", '/project/' + projectId + '/');
  };
  
  return (
    <DimmedBackground>
      <CenteredContent>
        <Container>
          
          <div className=" text-black h-7 w-7 self-end cursor-pointer" onClick={() => {              
              onClose();
            }}> 
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          {
            fromHomepage ? 
            (
                <GenericButton
                    title={"Go to Project"}
                    className="mx-auto"
                    onClick={redirectToProjectPage}
                />
            ) : null
          }
          

          
          <VersionPage
            versionId  = {versionId}
            projectId = {projectId}
          />

        </Container>
      </CenteredContent>
    </DimmedBackground>
  )
}

export default VersionModal
