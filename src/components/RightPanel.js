import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactTimeAgo from 'react-time-ago';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import { closePanel } from "../reducers/homepage/homepagePanel";

import SlidingPanel from 'react-sliding-side-panel';
import GenericButton from "./GenericButton";
import MusicList, { TRANSFORM_POPULAR_SINGLE, TRANSFORM_RECENT, TRANSFORM_RECENT_SINGLE } from "./MusicList";

TimeAgo.addDefaultLocale(en);

const DEFAULT_BACKGROUND = 'https://www.rollingstone.com/wp-content/uploads/2018/09/beatles-white-album-.jpg';

function getCollaborators(project) {
    let collaborators = new Set();
    for (let versionId in project.versions) {
        collaborators.add(project.versions[versionId].metaInfo.authorId);
    }
    return collaborators;
}

function SingleCollaborator(props) {
    return (
        <div className = "flex flex-col m-4">
            <div className="rounded-full h-24 w-24 overflow-hidden">
                <img src= {props.profileImage} className="object-cover h-24" />
            </div>
            <p className="text-center"> {props.name} </p>
        </div>
    );
}

function AllCollaborators(props) {
    const { profiles } = useSelector(state => state.database);

    let collaborators = props.collaborators;
    if (collaborators.length > 10) {
        collaborators = collaborators.slice(0, 10);
    }
    return (
        <div className="flex flex-wrap justify-evenly">
            {
                collaborators.map((authorId, idx) => {
                    const profileImage = profiles[authorId].metaInfo.profileImage;
                    const name = profiles[authorId].metaInfo.name;
                    const customKey = authorId;
                    return (
                        <div key={customKey}>
                            <SingleCollaborator name={name} profileImage={profileImage}/>
                        </div>
                    );
                })
            }
        </div>
    );
}

function RightPanel(props) {
    const dispatch = useDispatch();

    const { projects, profiles } = useSelector(state => state.database);
    const { panelState, sortType, projectId, versionId } = useSelector(state => state.homepagePanel);
    const { tabIndex } = useSelector(state => state.tabInfo);

    const _closePanel = () => {
        dispatch(closePanel());
    }

    let transform = TRANSFORM_POPULAR_SINGLE;
    if (tabIndex === 0 || sortType === TRANSFORM_RECENT) {
        transform = TRANSFORM_RECENT_SINGLE;
    }

    const project = projects[projectId];

    const background = project.metaInfo.backgroundImage;

    const collaborators = Array.from(getCollaborators(project));

    const trackTitle = project.metaInfo.trackTitle;
    const lastModified = project.metaInfo.lastModified;
    const creationTime = project.metaInfo.creationTime;
    const ownerName = profiles[project.metaInfo.ownerId].metaInfo.name;

    return (
        <SlidingPanel
            type={'right'}
            isOpen={panelState}
            size={30}
            backdropClicked={_closePanel}
            panelClassName='bg-white'
        >
            <div className='bg-white'>
                <div style={{
                    backgroundImage:`url(${background === "" ? DEFAULT_BACKGROUND : background})`,
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '400px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="flex">
                        <GenericButton title={"Upvote"} />
                        <GenericButton title={"Downvote"} />    
                        <GenericButton title={"Contribute"} />
                        <GenericButton title={"Go To Project"} />
                    </div>      
                </div>
                <div className="pt-5 pl-5 text-left">
                    <p className="text-4xl"> {trackTitle} </p>
                    <p className="text-2xl text-gray-600"> {ownerName} </p>
                </div>
                <div>
                    TAGS....
                </div>
                <div className="p-5 flex flex-row justify-between">
                    <div className="text-xs text-gray-500"> 
                        Last Modified: 
                        <br/>
                        <ReactTimeAgo date={lastModified} timeStyle="twitter-minute" locale="en-US"/>
                    </div>
                    <div className="text-xs text-gray-500"> 
                        Created: 
                        <br/>
                        <ReactTimeAgo date={creationTime} timeStyle="twitter-minute" locale="en-US"/>
                    </div>
                </div>
                <MusicList 
                    headers={['author', 'duration', 'updated']}
                    votes={true}
                    className={"max-h-96"}
                    transform={transform}
                    projectId={projectId}
                    versionId={versionId}
                />
                <div>
                <h2 className="pl-5 pt-5 text-left">
                        Collaborators
                    </h2>
                    <AllCollaborators collaborators={collaborators}/>
                </div>
            </div>
        </SlidingPanel>
    );
}

export default RightPanel;