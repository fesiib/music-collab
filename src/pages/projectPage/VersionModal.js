import React from 'react'

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
      className="h-5/6 flex flex-row align-center justify-center rounded-lg shadow-md bg-white"
      style={{ height: '720px', width: '1020px' }}
    >
      {children}
    </div>
  )
}

const VersionModal = ({ onClose }) => {
  return (
    <DimmedBackground>
      <CenteredContent>
        <Container>
          <button onClick={onClose} className="bg-blue-400 text-black h-7">
            Close
          </button>
        </Container>
      </CenteredContent>
    </DimmedBackground>
  )
}

export default VersionModal
