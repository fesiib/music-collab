import React, {useState, useEffect, useRef} from 'react'
import PianoIcon from '../media/piano.svg';
import { useDispatch, useSelector } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';   

import { pauseTracks, playTracks } from '../reducers/musicTracks';
import {setTimeAllTracks} from '../reducers/musicTracksTime'

import PlayButton from '../icons/play-button'
import PauseButton from '../icons/pause-button'



const OneTrack = (props) => {
    const waveformRef = useRef();
    var [waveSurfer, setWaveSurfer] = useState(null);
    var [playingAudio, setPlayingAudio] = useState(false);
    const [muted, setMuted] = useState(false);

    const dispatch = useDispatch();

    var {timeAllTracks} = useSelector(state => state.timeAllTracks);
    useEffect(() =>() => {
      if (timeAllTracks!=null){
        console.log ("timeAllTracks - when unmount", timeAllTracks);
        timeAllTracks.stop();
        console.log ("timeAllTracks.stop()", timeAllTracks);
        timeAllTracks.destroy();

        dispatch (setTimeAllTracks ( {timeAllTracks: null,} ));
      }
    }, []);
  
      useEffect(() => {
        if(waveSurfer == null) { // First render
          const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                cursorWidth: 1,
                progressColor: "#3949AB", //teal[500]
                responsive: true,
                waveColor: "#424242", //grey[800]
                cursorColor: "transparent",
                barWidth: 1,
                barHeight: 3,
                height:24,
                // backgroundColor: "#424242"
            })
          setWaveSurfer(wavesurfer);
          dispatch (setTimeAllTracks ( { timeAllTracks: wavesurfer} ));
          wavesurfer.load(props.audioUrl);
          console.log ("timeAllTrack when created", wavesurfer);
          // wavesurfer.on('destroy', ()=> {} );

        } else { // Song changed
          waveSurfer.load(props.audioUrl);
          // waveSurfer.on('seek', changeProgress);
        }
      }, [props.audioUrl]);

    

    const presPlay = () =>{
      // console.log(timeAllTracks);
      if (waveSurfer!=null) {
        if (playingAudio){
          waveSurfer.pause();
          setPlayingAudio (!playingAudio);
        } else {
          // waveSurfer.seekTo (  props.progressTime / waveSurfer.getDuration());
          waveSurfer.play();
          setPlayingAudio (!props.playAllTracks);
        }
      }
    }


    // useEffect(() => {
    //   presPlay();
    // }, [props.playAllTracks]);

    
    // useEffect(() => {
    //   if (waveSurfer!=null) {
    //     waveSurfer.seekTo (  props.progressTime / waveSurfer.getDuration());
    //   }
    // }, [props.progressTime]);
    

    const muteTrack  = ()=>{
      if (waveSurfer!=null){
        setMuted (!muted);
        waveSurfer.setMute(muted);
        if (muted){
          waveSurfer.setProgressColor("#FF0000");
        } else {
          waveSurfer.setProgressColor("#009688");
        }
      } 
    }

    const buttonClassName = "flex-none w-6  h-full place-items-center cursor-pointer"
    return (    
      <div className = "flex flex-raw h-6 bg-white">
        <div  onClick = {presPlay} className= { buttonClassName  } >
                  {  
                  playingAudio? <svg className="w-full h-full p-1"   viewBox="0 0 48 48" version="1.1" >
                  <g>
                    <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
                      l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
                    <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
                      C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
                  </g>
                  </svg> :
                  <svg  className="w-full h-full p-0.5"   viewBox = "0 0 48 48" version="1.1" >
                      <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="ic_fluent_play_48_filled" fill="#212121" fill-rule="nonzero">
                              <path d="M13.7501344,8.41212026 L38.1671892,21.1169293 C39.7594652,21.9454306 40.3786269,23.9078584 39.5501255,25.5001344 C39.2420737,26.0921715 38.7592263,26.5750189 38.1671892,26.8830707 L13.7501344,39.5878797 C12.1578584,40.4163811 10.1954306,39.7972194 9.36692926,38.2049434 C9.12586301,37.7416442 9,37.2270724 9,36.704809 L9,11.295191 C9,9.50026556 10.4550746,8.045191 12.25,8.045191 C12.6976544,8.045191 13.1396577,8.13766178 13.5485655,8.31589049 L13.7501344,8.41212026 Z" id="🎨-Color"></path>
                          </g>
                      </g>    
                  </svg>


                  // playingAudio ? <PauseButton addClassName = "p-16" /> :
                  //     <PlayButton  />
                  }
          </div>
          <div className = "flex-grow" >
    <div className = "flex flex-raw bg-white h-6"> 
        <div  //onClick = { presPlay}  
          className = "flex-none w-5  my-0.5 mx-1" >
            <img src= {PianoIcon} />
        </div>
            <div className = "flex-grow "  >
                <div  
                  className ="  " ref={waveformRef} id="waveform" 
                  // onClick = { () => {setButtonPressed (true) } }
                />
            </div>
          </div>
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
  var tracks = projects[projectId]["versions"][versionId]["tracks"];
  if (tracks.length>1) {
    tracks = [ tracks[0] ];
  }
  const track = tracks[0];
  const {playAllTracks} = useSelector(state => state.playAllTracks);
  const {timeAllTracks} = useSelector(state => state.timeAllTracks);

  

    return (
        <div className = "flex flex-col rounded-2xl mx-auto bg-gray-600 p-3 gap-3 my-5">

            
                <OneTrack  
                  audioUrl = {track.url}
                  type = {track.type}
                  playAllTracks = {playAllTracks}
                  progressTime = {timeAllTracks}
                />
                          
            
        </div>    
  )
}

export default MusicTracks













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