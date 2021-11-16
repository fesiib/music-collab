// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseCounter } from './reducers/counter'

import './index.css'
import UploadAudio from './components/UploadAudio'

function App() {
  const count = useSelector((state) => {
    console.log(state);
    return state?.counter?.cnt
  })
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col w-20 h-20 justify-center align-middle ml-3">
      Hello: {count}
      <button onClick={() => dispatch(increaseCounter())} className="bg-black">
        Increase
      </button>
    </div>
  )
}

export default App
