import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import testAudio from './music-test.mp3'

const MusicPlayer = () => {
    return (
        <div className="flex flex-1 flex-row justify-center" >  
            <ReactAudioPlayer controls src={testAudio}/>
        </div>
    )
}

export default MusicPlayer