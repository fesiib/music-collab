import React from 'react'

import withHeader from '../hocs/withHeader'

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import MusicTracks from '../components/MusicTracks'
import VersionContributor from '../components/VersionContributor'
import CommentSection from "../components/CommentSection"

const VersionPage = () => {
    let { versionId, projectId } = useParams();
    const {projects, profiles} = useSelector(state => state.database);
    
    console.log(projects)

    var versionExists = true;
    if (projects[projectId] == undefined) {
      versionExists = false;
    } else {
      if (projects[projectId]["versions"][versionId] == undefined) {
        versionExists =  false;
      }
    }

    return (
      <>

      {
        versionExists ?
        <div className= "rounded-md mx-auto bg-white border-t-2 border-black w-2/3 mx-auto my-6 px-10 ">
          <VersionContributor versionId = {versionId}  projectId = {projectId}  />
          <MusicTracks versionId = {versionId}  projectId = {projectId}   />
          <CommentSection versionId = {versionId}  projectId = {projectId}  />
        </div> :
        <div>
          No such project of vertion found
        </div>
      }
    
    </>
  )
}

export default withHeader(VersionPage)
