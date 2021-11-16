import React from 'react'

import withHeader from '../hocs/withHeader'

import { useParams } from "react-router-dom";


import MusicTracks from '../components/MusicTracks'
import VersionContributor from '../components/VersionContributor'
import GenericButton from '../components/GenericButton'
import CommentSection from "../components/CommentSection"

const VersionPage = () => {
    let { versionId, projectId } = useParams();

    return (
    <div className= "rounded-md mx-auto bg-white border-t-2 border-black w-2/3 mx-auto my-6 px-10 ">
        
        <VersionContributor/>

        <MusicTracks/>

        <div className= " w-full flex flex-raw my-5 h-10 text-primary">

            <div className= " flex-none w-10 text-4xl	">
                15
            </div>
            <div className= " flex-none w-10 ">
                <svg class="h-10 w-10 fill-current " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                </svg>
            </div>
            <div className= " flex-none w-10">
                <svg class="h-10 w-10 fill-current " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
                </svg>
            </div>
            <div className= " flex-grow"> </div>
            <div className= " flex-none "> 
                <GenericButton className="text-l mx-auto  p-2" title = {"comment"}/>
            </div>

        </div>
        
        <CommentSection/>

    </div>
    
  )
}

export default withHeader(VersionPage)
