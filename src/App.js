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
  const count = useSelector((state) => {
    return state?.counter?.cnt
  })
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col w-40 justify-center align-middle ml-3 p-5">
      Hello: {count}
      <Link to="/">
        <button className="bg-blue-300 text-black mt-4">
          Go to homepage
        </button>
      </Link>
      <button onClick={() => dispatch(increaseCounter())} className="bg-black mt-4">
        Increase
      </button>

      <button onClick={() => dispatch(resetApp())} className="bg-black my-4">
        RESET
      </button>

      <UploadAudio/>
    </div>
  )
}

export default App;