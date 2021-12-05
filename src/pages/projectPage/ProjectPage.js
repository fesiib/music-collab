import React from 'react'
import Tree from 'react-d3-tree'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import withHeader from '../../hocs/withHeader'
import buildData from './data'
import VersionModal from './VersionModal'
import './tree.css'

import Taglist from '../../components/TagList'
import upvoteIcon from '../../icons/upvote.svg'
import { useDispatch, useSelector } from 'react-redux';


import getIcon from '../../components/utils/getIcon';
import withLogin from '../../hocs/withLogin';

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
  }

const ProjectPage = ({
}) => {

  const [visible, setVisible] = React.useState(false)
  const [projectid, setProjectid] = React.useState('')
  const [versionid, setVersionid] = React.useState('')
  
  const renderForeignObjectNode = ({
    nodeDatum,
    foreignObjectProps
  }) => (
    <g onClick={() => {setVisible((prevState) => !prevState);setProjectid(projectId); setVersionid(nodeDatum.name)}}>
      <circle style={{stroke: 'black', fill:'white', }} r={30} ></circle>
      
      <text fill="black" strokeWidth="1" x={-nodeDatum.attributes.author.length*4} y="-40">{capitalize(nodeDatum.attributes.author)}</text>
      <image href={getIcon(nodeDatum.attributes.type)} width="30" height="30" x="-13" y="-17"></image>
      {nodeDatum.attributes.votes !=0 && <ellipse style={{stroke: 'none', fill: 'green',}} cx="15" cy="25" rx="10" ry="10"></ellipse>}
      
      
      {/* `foreignObject` requires width & height to be explicitly set. */}
      {nodeDatum.attributes.votes !=0 &&
      <foreignObject width= '100' height =  '100' y="17" x="8">
        <div className="flex flex-row w-max items-center text-xs text-white">
          {nodeDatum.attributes.votes < 0? nodeDatum.attributes.votes : "+"+String(nodeDatum.attributes.votes)}
          {/* <img
           className="h-1/4" 
          src={upvoteIcon}/>
          <img 
          className="h-1/4 self-end cursor-pointer transform rotate-180 "
          src={upvoteIcon}/> */}
        </div>
      </foreignObject>}
    </g>
  );

  const nodeSize = {x:200, y:200}
  
  
  const {database} = useSelector(state => state);
  const {projectId} = useParams();

  // console.log(database);
  let project = database.projects[projectId];
  const backgroundImage = project?.metaInfo?.backgroundImage;
  const lastModified = project?.metaInfo?.lastModified;
  const creationTime = project?.metaInfo?.creationTime;
  function SingleCollaborator(props) {
    return (
        <div className="flex flex-col m-4">
            <div className="rounded-full h-10 w-10 overflow-hidden">
                <img src={props.profileImage} className="object-cover h-10" />
            </div>
            <p className="text-center"> {props.name} </p>
        </div>
    );
}

function AllCollaborators(props) {
    const { profiles } = useSelector((state) => state.database);

    let collaborators = props.collaborators;
    if (collaborators.length > 10) {
        collaborators = collaborators.slice(0, 10);
    }
    return (
        <div className="flex flex-wrap justify-evenly">
            {collaborators.map((authorId, idx) => {
                const profileImage = profiles[authorId].metaInfo.profileImage;
                const name = profiles[authorId].metaInfo.name;
                const customKey = authorId;
                return (
                    <div key={customKey}>
                        <SingleCollaborator
                            name={name}
                            profileImage={profileImage}
                        />
                    </div>
                );
            })}
        </div>
    );
}
  console.log(project);
  let tags = project.metaInfo.tags
  let g = {};
  let root = null;
  let timestamps = [];
  let timestampId = {};
  let collaborators = []
  for(const [key, value] of Object.entries(project.versions)) {
    console.log(key, value);
    timestamps.push(value.metaInfo.creationTime);
    if(!(value.metaInfo.authorId in collaborators) ){
      collaborators.push(value.metaInfo.authorId);
    }
    if(value.metaInfo.parentVersionId != null) {
      if(g[value.metaInfo.parentVersionId]) {
        g[value.metaInfo.parentVersionId].push(key);
      } else {
        g[value.metaInfo.parentVersionId] = [key];
      }
    } else {
      root = key;
    }
  }
  timestamps.sort();
  for(let i = 0; i < timestamps.length; i ++) {
    console.log(timestamps[i])
    timestampId[timestamps[i]] = (i + 1);
  }
  console.log(root);
  console.log(g);
  let data = buildData(root, g, project.versions, timestampId);
  console.log(data);
  return (
    <div className="w-full flex flex-col items-center p-6" data-cy="container">
      <div
        data-cy="content"
        className="w-4/5 h-full rounded-xl bg-white shadow-lg flex flex-col p-4 pt-8"
      > <div className="flex flex-row">
        <img src={backgroundImage}
        className="max-h-60 max-w-60 transform hover:scale-125 hover:border-4 cursor-pointer ml-10"
                        
        />
        <div className="ml-4 mt-2 flex flex-col ">
        <h1>{project.metaInfo.trackTitle}</h1>
        <h2>{capitalize(project.metaInfo.ownerId)}</h2>
        <h3 className="">{project.metaInfo.description}</h3>
        <Taglist tags={tags}/>
        <h3>Versions: {Object.keys(project.versions).length} </h3>
        <h3 >
            Last Modified:&nbsp;
            <ReactTimeAgo
                date={lastModified}
                timeStyle="twitter-minute"
                locale="en-US"
            />
        </h3>
        <h3 >
            Created:&nbsp;
            <ReactTimeAgo
                date={creationTime}
                timeStyle="twitter-minute"
                locale="en-US"
            />
        </h3>
        {/* <h3>Collabotors: {collaborators.length-1}</h3> */}

        

        </div>
        <div className="w-1/4 mr-10 ml-4">
          <h2 className="pl-5 pt-5 text-center">Collaborators</h2>
          <AllCollaborators collaborators={collaborators} />
        </div>
        </div>
        <div className="w-11/12 h-96 rounded-xl bg-blue-50 shadow-lg flex flex-col items-center p-4 m-10" >
            <Tree 
            data={data}
            pathFunc="straight"
            translate={{x:50, y:180}}
            collapsible={false}
            renderCustomNodeElement={(rd3tProps)=> renderForeignObjectNode({...rd3tProps})}
            />
            
        </div>
      </div>
      {visible && <VersionModal onClose={() => setVisible(false)} projectId={projectid}  versionId={versionid}/>}
    </div>
  )
}

export default withHeader(withLogin(ProjectPage))
