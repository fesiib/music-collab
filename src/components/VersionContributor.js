import React from 'react'
import ProfilePic from '../media/profile-svgrepo-com.svg';


import { useDispatch, useSelector } from 'react-redux';
import { pauseTracks, playTracks } from '../reducers/musicTracks';

import time_ago from './utils/timeAgo'
import PlayButton from '../icons/play-button'
import PauseButton from '../icons/pause-button'

const VersionContributor = ( {versionId, projectId}) => {

    const {projects, profiles} = useSelector(state => state.database);

    const versionInfo = projects[projectId]["versions"][versionId]["metaInfo"];
    const authorId = versionInfo["authorId"];
    const contributionMessage = versionInfo["contributionMessage"];
    const votes = versionInfo["votes"];
    const creationTime = versionInfo["creationTime"];
    const timeAgoCreated = time_ago (creationTime);

    console.log(projects)

    const dispatch = useDispatch();

    const {playAllTracks} = useSelector(state => state.playAllTracks);
    const playAll = ()=>{
        if (playAllTracks) {
            dispatch (pauseTracks());
        } else {
            dispatch (playTracks());
        }
    }

    const buttonClassName = "flex-none w-20  h-full place-items-center border rounded-full"

    return (
        <div className = "flex flex-row h-20 my-10 gap-x-6">

            <div  onClick = {playAll} className= { playAllTracks? buttonClassName: buttonClassName + " pl-2" } >
                {   playAllTracks ? <PauseButton/> :
                    <PlayButton/>
                }
                
                
            </div>

            <div className="flex-grow h-full  rounded-3xl border border-black px-5">
                <div className = "flex flex-col ">
                    <div className = "flex-none text-gray-600	 " >Description</div>
                    <div className = "flex-grow" >{contributionMessage} </div>
                </div>
                
            </div>
            <div className="flex-none w-56 h-full  ">
                <div className = "flex flex-col ">
                    <div className = "flex-none text-gray-600	 " >Contributor</div>
                    <div className = "flex-grow" >
                    <div className = "flex flex-row ">
                        <div className = "flex-none  w-14	 " >
                            <img src= {ProfilePic} />
                        </div>
                        <div className = "flex-grow p-2 px-4 " >
                            <p> {authorId} </p>
                            <p className = "text-gray-600" > {timeAgoCreated} </p>
                        </div>
                    </div>

                    </div>
                </div>


            </div>
        </div>
  )
}

export default VersionContributor
