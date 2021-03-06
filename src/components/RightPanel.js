import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactTimeAgo from "react-time-ago";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import { closePanel } from "../reducers/homepage/homepagePanel";

import SlidingPanel from "react-sliding-side-panel";
import GenericButton from "./GenericButton";
import MusicList, {
    TRANSFORM_POPULAR_SINGLE,
    TRANSFORM_RECENT,
    TRANSFORM_RECENT_SINGLE
} from "./MusicList";
import TagList from "./TagList";
import { useHistory } from "react-router";
import SingleCollaborator from "./SingleCollaborator";
import { Link } from "react-router-dom";

//const DEFAULT_BACKGROUND = 'https://www.rollingstone.com/wp-content/uploads/2018/09/beatles-white-album-.jpg';

function getCollaborators(project) {
    let collaborators = new Set();
    if (!project) {
        return collaborators;
    }
    if (project) {
        for (let versionId in project.versions) {
            collaborators.add(project.versions[versionId].metaInfo.authorId);
        }
    }
    return collaborators;
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

function RightPanel(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { projects, profiles } = useSelector((state) => state.database);
    const { panelState, sortType, projectId, versionId } = useSelector(
        (state) => state.homepagePanel
    );
    const { tabIndex } = useSelector((state) => state.tabInfo);

    const _closePanel = () => {
        dispatch(closePanel());
    };

    let transform = TRANSFORM_POPULAR_SINGLE;
    if (tabIndex === 0 || sortType === TRANSFORM_RECENT) {
        transform = TRANSFORM_RECENT_SINGLE;
    }

    const project = projects[projectId];

    // let background = null;
    // if (typeof project.metaInfo.backgroundImage === 'string' && project.metaInfo.backgroundImage > 0) {
    //     background = project.metaInfo.backgroundImage;
    // }

    const collaborators = Array.from(getCollaborators(project));

    const backgroundImage = project?.metaInfo?.backgroundImage;
    const trackTitle = project?.metaInfo?.trackTitle;
    const tags = project?.metaInfo?.tags;
    const lastModified = project?.metaInfo?.lastModified;
    const creationTime = project?.metaInfo?.creationTime;
    const ownerName = profiles[project?.metaInfo?.ownerId]?.metaInfo?.name;


    const redirectToProjectPage = () => {
        _closePanel();
        history.push('/project/' + projectId + '/');
        console.log("here", '/project/' + projectId + '/');
    };

    useEffect(() => {
        TimeAgo.addDefaultLocale(en);
    }, [en]);

    return (
        <SlidingPanel
            type={"right"}
            isOpen={panelState}
            size={30}
            backdropClicked={_closePanel}
            panelClassName=" bg-gray-50"
        >
            <div className="bg-white">
                <div className="flex flex-row justify-between">
                    <h3 className="text-left p-4"> About Project </h3>
                    <Link to={`/project/${projectId}/`}>
                        <GenericButton
                            title={"Go to Project"}
                            className="m-3 mr-5"
                            // onClick={redirectToProjectPage}
                        />
                    </Link>
                </div>

                <div className="flex flex-row p-5">
                    <Link to={`/project/${projectId}/`}>
                        <img src={backgroundImage}
                            className="max-h-28 max-w-28 transform hover:scale-125 hover:border-4 cursor-pointer"
                            // onClick={redirectToProjectPage}
                            alt="cover"
                        />
                    </Link>
                    <div className="pl-5 pb-5 text-left">
                        <Link to={`/project/${projectId}/`}>
                            <p
                                className="text-2xl underline hover:text-gray-600 cursor-pointer"
                                // onClick={redirectToProjectPage}
                            >
                                {" "}
                                {trackTitle}{" "}
                            </p>
                        </Link>
                        <p className="text-xl text-gray-600"> {ownerName} </p>
                    </div>
                    
                </div>

                {/* <div style={{
                    backgroundImage:`url(${background})`,
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
                </div> */}
                <div className="pl-5">
                    <p> Tags: </p>
                    <TagList tags={tags} />
                </div>
                <div className="p-5 flex flex-row justify-between">
                    <div className="text-xs text-gray-500">
                        Last Modified:
                        <br />
                        <ReactTimeAgo
                            date={lastModified}
                            timeStyle="twitter-minute"
                            locale="en-US"
                        />
                    </div>
                    <div className="text-xs text-gray-500">
                        Created:
                        <br />
                        <ReactTimeAgo
                            date={creationTime}
                            timeStyle="twitter-minute"
                            locale="en-US"
                        />
                    </div>
                </div>
                <h2 className="m-5 text-left"> Versions </h2>
                <MusicList
                    headers={["playButton", "author", "duration"]}
                    votes={true}
                    className={"max-h-96"}
                    transform={transform}
                    projectId={projectId}
                    versionId={versionId}
                    panel={true}
                />
                <div>
                    <h2 className="pl-5 pt-5 text-left">Collaborators</h2>
                    <AllCollaborators collaborators={collaborators} />
                </div>
            </div>
        </SlidingPanel>
    );
}

export default RightPanel;
