import React from 'react'
import Logo from './logo.svg'
import MusicPlayer from './MusicPlayer'
import logout from './logout.svg'

const Header = () => {
  return (
    <div className="w-full h-28 flex flex-row items-center bg-white px-8 box-border ">
      <div className="flex flex-1 items-center justify-start">
        <img src={Logo} alt="logo" />
        <h1 className="flex-1"> SoundBeat </h1>
      </div>
      <MusicPlayer />

      <div className="flex flex-1 flex-row items-center justify-end">
        <h1> John Clay</h1>
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
