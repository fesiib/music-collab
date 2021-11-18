import React from 'react'
import Tree from 'react-d3-tree'
import withHeader from '../../hocs/withHeader'
import buildData from './data'
import VersionModal from './VersionModal'
import './tree.css'
import image1 from '../../media/piano.svg'
import image2 from '../../media/guitar.svg'
import image3 from '../../media/vocal.svg'
import image4 from '../../media/electric.svg'
import image5 from '../../media/drums.svg'
import Taglist from '../../components/TagList'
import upvoteIcon from '../../icons/upvote.svg'
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { version } from 'react-dom'
const image = (type) => {
  switch(type){
    case "piano":
      return image1
    case "guitar":
      return image2
    case "vocal":
      return image3
    case "bass":
      return image4
    case "drums":
      return image5
    default: 
      return image3
  }
  
  
  
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
      <circle style={{stroke: 'none', fill:'white', }} r={30} ></circle>
      
      <text fill="black" strokeWidth="1" x={-nodeDatum.attributes.author.length*4} y="-40">{nodeDatum.attributes.author}</text>
      <image href={image(nodeDatum.attributes.type)} width="30" height="30" x="-13" y="-17"></image>
      <ellipse style={{stroke: 'none', fill: 'green',}} cx="15" cy="25" rx="10" ry="10"></ellipse>
      
      
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject width= '100' height =  '100' y="17" x="8">
        <div className="flex flex-row w-max items-center text-xs text-white">
          +{nodeDatum.attributes?.votes}
          {/* <img
           className="h-1/4" 
          src={upvoteIcon}/>
          <img 
          className="h-1/4 self-end cursor-pointer transform rotate-180 "
          src={upvoteIcon}/> */}
        </div>
      </foreignObject>
    </g>
  );

  const nodeSize = {x:200, y:200}
  
  
  const {database} = useSelector(state => state);
  const {projectId} = useParams();

  // console.log(database);
  let project = database.projects[projectId];
  console.log(project);
  
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
        className="w-4/5 h-full rounded-xl bg-white shadow-lg flex flex-col items-center p-4 pt-8"
      >
        <h1>{project.metaInfo.trackTitle}</h1>
        <h3 className="mt-4">{project.metaInfo.description}</h3>
        <Taglist tags={['fd', 'der']}/>
        <div className="mt-4 flex flex-col items-center">
          <h2>By {project.metaInfo.ownerId}</h2>
          <h3>Collabotors: {collaborators.length-1}</h3>
          <h3>Versions: {Object.keys(project.versions).length} </h3>
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

export default withHeader(ProjectPage)
