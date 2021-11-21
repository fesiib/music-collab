import React from "react";
import { useSelector } from "react-redux";

import OneTrack from "./OneTrack";

const MusicTracks = ({ versionId, projectId }) => {
    const { projects, profiles } = useSelector((state) => state.database);
    // {
    //   url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    //   type: 'piano',
    // }
    var tracks = projects[projectId]["versions"][versionId]["tracks"];
    if (tracks.length > 1) {
        tracks = [tracks[tracks.length - 1]];
    }

    const lastTrack = tracks.length > 0 ? tracks[tracks.length - 1] : null;

    // const track = tracks[0];
    const { playAllTracks } = useSelector((state) => state.playAllTracks);
    const { timeAllTracks } = useSelector((state) => state.timeAllTracks);

    return (
        <div className="flex flex-col rounded-2xl mx-auto bg-gray-600 p-3 gap-3 my-5">
            <OneTrack
                audioUrl={lastTrack?.url}
                type={lastTrack?.type}
                playAllTracks={playAllTracks}
                progressTime={timeAllTracks}
            />
        </div>
    );
};

export default MusicTracks;

/*
import React, {useState, useEffect, useRef} from 'react'
import PianoIcon from '../media/piano.svg';
import { useDispatch, useSelector } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';   

import {setTimeAllTracks} from '../reducers/musicTracksTime'
import randomString from '../services/randomString';





const OneTrack = (props) => {
    const dispatch = useDispatch();
    const waveformRef = useRef();
    const [waveSurfer, setWaveSurfer] = useState(null);
    const [muted, setMuted] = useState(false);


    const changeProgress = () => {
      // console.log  ("changeProgress event called");
      // console.log  ("waveSurfer ", waveSurfer);
        if (waveSurfer!=null) {
          // console.log  ("changeProgress - if not null");
          const currentTime = waveSurfer.getCurrentTime();
          // const currentTime2 =e*waveSurfer.getDuration();
          // console.log  ("dispatch sent");
          // console.log  ({timeAllTracks: currentTime });

          dispatch ( setTimeAllTracks ( {timeAllTracks: currentTime } ) );
      }
    }

    useEffect(() => {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        cursorWidth: 1,
        progressColor: "#3F51B5", //teal[500]
        responsive: true,
        waveColor: "#424242", //grey[800]
        cursorColor: "transparent",
        barWidth: 1,
        barHeight: 3,
        height:24,
      });

      console.log ("wavesurfer----", wavesurfer);
      wavesurfer.load(props.audioUrl);
      wavesurfer.on('seek', ()=>changeProgress() );
      setWaveSurfer(wavesurfer);
    },[])
    

    
    useEffect(() => {
      if (waveSurfer!=null) {
        if (!props.playAllTracks){
          waveSurfer.pause();
        } else {
          console.log ("props.progressTime", props.progressTime);
          var seekToThis = props.progressTime / waveSurfer.getDuration();
          if ( seekToThis>=1) {
            seekToThis = 1;
          }
          waveSurfer.seekTo (seekToThis);
          waveSurfer.play();
          

        }
      }
    }, [props.playAllTracks]);

    
    useEffect(() => {
      if (waveSurfer!=null) {
        // console.log (props.progressTime / waveSurfer.getDuration());
        // console.log (props.progressTime / waveSurfer.getDuration());
        var seekToThis = props.progressTime / waveSurfer.getDuration();
        if ( seekToThis>=1) {
          seekToThis = 1;
        }
        waveSurfer.seekTo (seekToThis);
      }
    }, [props.progressTime]);

    
    


    const muteTrack  = ()=>{
      if (waveSurfer!=null){
        setMuted (!muted);
        waveSurfer.setMute(muted);
        if (muted){
          waveSurfer.setProgressColor("#FF0000");
        } else {
          waveSurfer.setProgressColor("#3F51B5");
        }
      }
      
    }

    return (    
    <div className = "flex flex-raw bg-white h-6"> 
        <div  onClick = { muteTrack}  className = "flex-none w-5  my-0.5 mx-1" >
            <img src= {PianoIcon} />
        </div>
        
            <div className = "flex-grow "  >
                <div  ref={waveformRef} />

            </div>
    </div>          
  )
}


const MusicTracks = ({versionId, projectId}) => {
  
  const {projects, profiles} = useSelector(state => state.database);
  // {
  //   url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
  //   type: 'piano',
  // }
  const tracks = projects[projectId]["versions"][versionId]["tracks"];
  const {playAllTracks} = useSelector(state => state.playAllTracks);
  const {timeAllTracks} = useSelector(state => state.timeAllTracks);

    return (
        <div className = "flex flex-col rounded-2xl mx-auto bg-gray-600 p-3 gap-3 my-5">

            {
              tracks.map ( track=> {
                return (<OneTrack  
                  audioUrl = {track.url}
                  type = {track.type}
                  playAllTracks = {playAllTracks}
                  progressTime = {timeAllTracks}
                />)
              } )

            }

            
            
        </div>    
  )
}

export default MusicTracks
*/
