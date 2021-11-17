import React from 'react'

import withHeader from '../hocs/withHeader'

import { useParams } from "react-router-dom";


import MusicTracks from '../components/MusicTracks'
import VersionContributor from '../components/VersionContributor'
import CommentSection from "../components/CommentSection"

const VersionPage = () => {
    let { versionId, projectId } = useParams();

    return (
    <div className= "rounded-md mx-auto bg-white border-t-2 border-black w-2/3 mx-auto my-6 px-10 ">
        
        <VersionContributor/>

        <MusicTracks/>

        
        <CommentSection versionId = {versionId}  projectId = {projectId}  />

    </div>
    
  )
}

export default withHeader(VersionPage)
