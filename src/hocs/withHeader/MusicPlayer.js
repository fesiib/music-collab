import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { useDispatch, useSelector } from 'react-redux';
import { setAudio } from '../../reducers/player';
import { getFileURL } from '../../services/storage';

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