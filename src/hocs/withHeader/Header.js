import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './logo.svg'
import MusicPlayer from './MusicPlayer'
import logout from './logout.svg'
import { useSelector } from 'react-redux'

const Header = () => {
  const { profiles, userId } = useSelector(state => state.database);

  const userName = profiles[userId].metaInfo.name;

  return (
    <div className="w-full h-28 flex flex-row items-center bg-white px-8 box-border ">
      <div className="flex flex-1 items-center justify-start">
        <Link
          to="/"
          className="flex flex-row items-center justify-start"
        >
          {/* <img src={Logo} alt="logo" /> */}
          <div className="w-10 h-10 shadow-inner box-border rounded-full bg-red-600 mr-4" />
          <h1 className="flex-1"> SoundBeat </h1>
        </Link>
      </div>
      <MusicPlayer />

      <div className="flex flex-1 flex-row items-center justify-end">
        <h1> {userName} </h1>
        <div
          data-cy="separator"
          className="w-16 h-0 transform rotate-90 border-2 border-gray-20"
        />
        <img src={logout} alt="logout button" />
      </div>
    </div>
  )
}

export default Header
