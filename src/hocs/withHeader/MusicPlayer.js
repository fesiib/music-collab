import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { useDispatch, useSelector } from 'react-redux';
import { setAudio } from '../../reducers/player';
import { getFileURL } from '../../services/storage';

const AUDIO_EXAMPLE_1 = "https://firebasestorage.googleapis.com/v0/b/music-collab-9ec47.appspot.com/o/projects%2F83448da950164b1886dafaa7fd14540abest_song.mp3?alt=media&token=3e0e5978-ff1e-4020-98d9-48de4a9df39e";
const AUDIO_EXMPALE_2 = "https://firebasestorage.googleapis.com/v0/b/music-collab-9ec47.appspot.com/o/projects%2Fdf04c163723f4d76bbb74585dc61e559song.mp3?alt=media&token=07942ecb-a06b-44f7-af79-390d675ebc15";


const MusicPlayer = () => {
    const dispatch = useDispatch();

    const { title, audio } = useSelector(state => state.player);

    const _setAudio = (audio) => {
        dispatch(setAudio({ title: 'best', audio }));
    }

    useEffect(() => {
        if (title !== 'best') {
            getFileURL("83448da950164b1886dafaa7fd14540abest_song.mp3", _setAudio);
        }
    });

    return (
        <div className="flex flex-1 flex-row justify-center" >  
            <ReactAudioPlayer controls src={audio}/>
        </div>
    )
}

export default MusicPlayer