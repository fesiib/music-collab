import React, { useState, useEffect, useRef } from 'react'
import PianoIcon from '../media/piano.svg'

import WaveSurfer from 'wavesurfer.js'

const OneTrack = (props) => {
  const waveformRef = useRef()

  const trackRef = useRef()

  const [waveSurfer, setWaveSurfer] = useState(null)
  const [playingAudio, setPlayingAudio] = useState(false)

  const playAudio = () => {
    waveSurfer.play()
  }

  const pauseAudio = () => {
    waveSurfer.pause()
  }

  useEffect(() => {
    if (waveSurfer == null) {
      // First render
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        cursorWidth: 1,
        progressColor: '#009688', //teal[500]
        responsive: true,
        waveColor: '#424242', //grey[800]
        cursorColor: 'transparent',
        barWidth: 1,
        barHeight: 3,
        height: 24
        // backgroundColor: "#424242"
      })
      setWaveSurfer(wavesurfer)
      wavesurfer.load(props.audioUrl)
    } else {
      // Song changedr
      waveSurfer.load(props.audioUrl)
      setPlayingAudio(false)
    }
  }, [props.audioUrl])

  return (
    <div className="flex flex-raw bg-white h-6">
      <div className="flex-none w-5  my-0.5 mx-1">
        <img src={PianoIcon} alt="piano icon" />
      </div>

      <div className="flex-grow  ">
        <div ref={waveformRef} id="waveform" />
      </div>
    </div>
  )
}

export default OneTrack
