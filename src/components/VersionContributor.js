import React from 'react'


import { useDispatch, useSelector } from 'react-redux';
import { pauseTracks, playTracks } from '../reducers/musicTracks';

import time_ago from './utils/timeAgo'
import PlayButton from '../icons/play-button'
import PauseButton from '../icons/pause-button'
import GenericButton from './GenericButton';

const VersionContributor = ( {versionId, projectId}) => {

    const {projects, profiles} = useSelector(state => state.database);
    const versionInfo = projects[projectId]["versions"][versionId]["metaInfo"];
    const authorId = versionInfo["authorId"];
    const contributionMessage = versionInfo["contributionMessage"];
    const votes = versionInfo["votes"];
    const creationTime = versionInfo["creationTime"];
    const timeAgoCreated = time_ago (creationTime);

    const userName =  profiles[authorId]["metaInfo"]["name"];
    const profilePic =  profiles[authorId]["metaInfo"]["profileImage"];

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
    const goToContributePage = ()=> {
        console.log ("goToContributePage");
    }
    const buttonClassName = "flex-none w-20  h-full place-items-center border rounded-full"

    return (
        <div>
        <div className="w-full h-2  text-right  ">
                <GenericButton class="float-right ..." onClick = { goToContributePage } className="text-l mx-auto  px-2" title = {"contribute"}/>
        </div>
        <div className = "flex flex-row h-20 my-10 gap-x-6">

            <div  onClick = {playAll} className= { playAllTracks? buttonClassName: buttonClassName + " pl-2" } >
                {   playAllTracks ? <PauseButton/> :
                    <PlayButton  />
                }
            </div>

            <div className="flex-grow h-full  rounded-3xl border border-black px-5">
                <div className = "flex flex-col ">
                    <div className = "flex-none text-gray-600	 " >Description</div>
                    <div className = "flex-grow" >{contributionMessage} </div>
                </div>
                
            </div>
            <div className="flex-none w-40 h-full  ">
                <div className = "flex flex-col ">
                    <div className = "flex-none text-gray-600	flex flex-raw " >
                            Contributor
                        </div>

                    <div className = "flex-grow" >
                    <div className = "flex flex-row ">
                        <div className = "flex-none " >
                            <img class="w-14 h-14 rounded-full object-cover" src= {profilePic} />
                        </div>
                        <div className = "flex-grow p-2 px-4 " >
                            <p> {userName} </p>
                            <p className = "text-gray-600 text-xs " > {timeAgoCreated} </p>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default VersionContributor
