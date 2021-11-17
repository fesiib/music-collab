import React, {useState, useEffect, useRef} from 'react'
import PianoIcon from '../media/piano.svg';

import WaveSurfer from 'wavesurfer.js';   

/*
tracks: [
  {
    audioUrl: ...
    insturment: ...

  }
]
*/



const OneTrack = (props) => {
    const waveformRef = useRef();
    
    const trackRef = useRef(); 
    
    const [waveSurfer, setWaveSurfer] = useState(null);
    const [playingAudio, setPlayingAudio] = useState(false);
    
    const playAudio = () => {
        waveSurfer.play();
      };
    
      const pauseAudio = () => {
        waveSurfer.pause();
      };

      useEffect(() => {
        if(waveSurfer == null) { // First render
          const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                cursorWidth: 1,
                progressColor: "#009688", //teal[500]
                responsive: true,
                waveColor: "#424242", //grey[800]
                cursorColor: "transparent",
                barWidth: 1,
                barHeight: 3,
                height:24,
                // backgroundColor: "#424242"
            })
          setWaveSurfer(wavesurfer);
          wavesurfer.load(props.audioUrl)

        } else { // Song changed
          waveSurfer.load(props.audioUrl);
          
        }
      }, [props.audioUrl]);

    const presPlay = () =>{
      if (playingAudio){
        pauseAudio();
        setPlayingAudio (!playingAudio);
      } else {
        playAudio();
        setPlayingAudio (!playingAudio);
      }
    }
    return (    
    <div className = "flex flex-raw bg-white h-6"> 
        <div  onClick = { presPlay}  className = "flex-none w-5  my-0.5 mx-1" >
            <img src= {PianoIcon} />
        </div>
        
            <div className = "flex-grow "  >
                 
                <div  className ="  " ref={waveformRef} id="waveform" />

            </div>
    </div>          
  )
}


const MusicTracks = () => {

    return (
        <div className = "flex flex-col rounded-2xl mx-auto bg-gray-600 p-3 gap-3 my-5">

            <OneTrack  
                audioUrl = {"http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"}
            />
            <OneTrack  
                audioUrl = {"http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"}
            />
            <OneTrack  
                audioUrl = {"http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"}
            />
            
        </div>    
  )
}

export default MusicTracks
