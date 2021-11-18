import React from 'react'

import withHeader from '../hocs/withHeader'

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import MusicTracks from '../components/MusicTracks'
import VersionContributor from '../components/VersionContributor'
import CommentSection from "../components/CommentSection"

const VersionPage = ({versionId,projectId}) => {
    // let { versionId, projectId } = useParams();
    const {projects, profiles} = useSelector(state => state.database);

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
        <div className= "rounded-md mx-auto bg-white overflow-y-auto border-t-2 border-black w-2/3 mx-auto my-6 px-10 ">
          <VersionContributor versionId = {versionId}  projectId = {projectId}  />
          <MusicTracks versionId = {versionId}  projectId = {projectId}   />
          <CommentSection versionId = {versionId}  projectId = {projectId}  />
        </div> :
        <div>
          No such project or version found
        </div>
      }
    
    </>
  )
}

export default VersionPage;
