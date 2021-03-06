// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseCounter } from './reducers/counter'
import { Link } from 'react-router-dom'

import './index.css'
import UploadAudio from './components/UploadAudio'
import { resetApp } from './reducers'

function App() {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col justify-center align-middle ml-3 p-5">
      <Link to="/">
        <button className="bg-blue-300 text-black my-4 w-40">
          Go to homepage
        </button>
      </Link>

      <div className=""> Hello its Prototype page, you can reset the state of the website here! </div>
      <button onClick={() => dispatch(resetApp())} className="bg-black w-40">
        RESET
      </button>

      <div className="mt-4"> Also you can check if you can upload something here! </div>
      
      <UploadAudio/>
    </div>
  )
}

export default App;