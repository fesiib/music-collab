import React from 'react'

import playIcon from '../../icons/playIcon.svg'
import userMale from '../../icons/userMale.svg'

const VersionPage = ({ description, contributor }) => {
  return (
    <div data-cy="container" className="w-full flex flex-col p-8">
      <div>
        <InfoContainer>
          <MainInfo description={description} contributor={contributor} />
        </InfoContainer>
        <CommentsContainer>Sobaka</CommentsContainer>
      </div>
    </div>
  )
}

const InfoContainer = ({ children }) => {
  return (
    <div data-cy="MainInformation" className="w-full flex flex-col">
      {children}
    </div>
  )
}

const MainInfo = ({ description, contributor }) => {
  return (
    <div className="w-full h-28 flex flex-row items-start">
      <img src={playIcon} alt="play button" className="self-center" />
      <div className="w-3/5 h-full flex flex-col ml-6 pb-3">
        <div className="text-gray-600 font-semibold ml-3 mb-1">Description</div>
        <div className="w-full flex flex-1 flex-col rounded-lg border-black border px-2 pb-2">
          <div>
            <p className="font-normal">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8">
        <div className="text-gray-600 font-semibold mb-1">Contributor</div>
        <div className="flex flex-row">
          <img src={userMale} alt="profile icon" />
          <div className="flex flex-col ml-4">
            <h3> {contributor?.name} </h3>
            <div className="font-bold"> {contributor?.lastUpdate} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CommentsContainer = ({ children }) => {
  return <div className="w-full flex flex-col">{children}</div>
}

export default VersionPage
