import React, { createRef, useEffect, useRef } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { useDispatch, useSelector } from 'react-redux';
import { pauseMusic, playMusic, startedOver } from '../../reducers/player';


export function getAllTracks(project, leafId) {
    let tracks = [];
    while (leafId !== null) {
        if (!project?.versions.hasOwnProperty(leafId)) {
            break;
        }
        const version = project?.versions[leafId];
        for (let track of version?.tracks) {
            tracks.push(track);
        }
        leafId = version?.metaInfo?.parentVersionId;
    }
    return tracks;
}

function MusicPlayer() {
    const dispatch = useDispatch();

    const { projects } = useSelector(state => state.database );
    const { versionId, projectId, playing, startOver } = useSelector(state => state.player);

    const mainTrackRef = useRef();
    const refList = useRef([]);
    
    let sortedTracks = [{
        url: null,
        duration: 0,
        type: 'song',
    }];
    if (projects.hasOwnProperty(projectId)) {
        const project = projects[projectId];
        const allTracks = getAllTracks(project, versionId);
        if (allTracks.length > 0)
            sortedTracks = allTracks;
    }
    //console.log(sortedTracks);
    sortedTracks.sort((p1, p2) => {
        return p1?.duration - p2?.duration;
    });

    const mainTrack = sortedTracks.pop();
    refList.current = sortedTracks.map((_, i) => refList.current[i] ?? createRef());

    const playAll = () => {
        for (let ref of refList.current) {
            const audioEl = ref.current?.audioEl?.current;
            audioEl?.play();
        }
    }

    const pauseAll = () => {
        for (let ref of refList.current) {
            const audioEl = ref.current?.audioEl?.current;
            audioEl?.pause();
        }
    }

    const seekAll = (event) => {
        const timeStamp = event?.target?.currentTime;
        for (let ref of refList.current) {
            const audioEl = ref.current?.audioEl?.current;
            let seek = timeStamp;
            while (seek >= audioEl?.duration) {
                seek -= audioEl?.duration;
            }
            audioEl.currentTime = seek;
        }
    }

    const volumeChangeAll = (event) => {
        const volume = event.target?.volume;
        for (let ref of refList.current) {
            const audioEl = ref.current?.audioEl?.current;
            audioEl.volume = volume;
        }
    }
    useEffect(() => {
        if (startOver) {
            mainTrackRef.current.audioEl.current.currentTime = 0;
            dispatch(startedOver());
            mainTrackRef.current.audioEl?.current?.play();
            playAll();
        }
        if (playing && mainTrackRef.current?.audioEl?.current?.paused) {
            mainTrackRef.current?.audioEl?.current?.play();
        }
        else if (!playing && !mainTrackRef.current?.audioEl?.current?.paused) {
            mainTrackRef.current?.audioEl?.current?.pause();
        }
    }, [sortedTracks, playing, startOver]);

    return (
        <div className="flex flex-1 flex-row justify-center" >
            {
                sortedTracks.map((element, idx) => {
                    const key = "track_" + idx.toString()
                    return (
                        <ReactAudioPlayer className="hidden" key={key} controls loop src={element.url} ref={refList.current[idx]}/>
                    );
                })
            } 
            <ReactAudioPlayer controls 
                ref={mainTrackRef}
                src={mainTrack.url}
                onPlay={() => {
                    playAll();
                    dispatch(playMusic());
                }}
                onPause={() => {
                    pauseAll();
                    dispatch(pauseMusic());
                }}
                onEnded={pauseAll}
                onSeeked={seekAll}
                onVolumeChanged={volumeChangeAll}
            />
        </div>
    )
}

export default MusicPlayer