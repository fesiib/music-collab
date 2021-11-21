import React, { useState, version } from 'react';

import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import 'react-sliding-side-panel/lib/index.css';

import GenericButton from '../components/GenericButton';
import MusicList, { TRANSFORM_AUTHOR, TRANSFORM_OWNER, TRANSFORM_POPULAR, TRANSFORM_RECENT } from '../components/MusicList';
import SearchBar from '../components/SearchBar';
import withHeader from '../hocs/withHeader';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel, setSortType } from '../reducers/homepage/homepagePanel';
import { setTabIndex } from '../reducers/homepage/tabInfo';
import RightPanel from '../components/RightPanel';
import { useHistory } from 'react-router';
import VersionModal from './projectPage/VersionModal';

const SELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-white bg-indigo-500 cursor-pointer border-t-2 border-l-2 border-r-2 border-black box-border";
const DESELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-black bg-white cursor-pointer border-t-2 border-l-2 border-r-2  border-black hover:bg-indigo-500 hover:text-white box-border";

const AUDIO_EXAMPLE_1 = "https://firebasestorage.googleapis.com/v0/b/music-collab-9ec47.appspot.com/o/projects%2F83448da950164b1886dafaa7fd14540abest_song.mp3?alt=media&token=3e0e5978-ff1e-4020-98d9-48de4a9df39e";
const AUDIO_EXMPALE_2 = "https://firebasestorage.googleapis.com/v0/b/music-collab-9ec47.appspot.com/o/projects%2Fdf04c163723f4d76bbb74585dc61e559song.mp3?alt=media&token=07942ecb-a06b-44f7-af79-390d675ebc15";


function Homepage(props) {
    const history = useHistory();

    const dispatch = useDispatch();

    const { sortType } = useSelector(state => state.homepagePanel);
    const { tabIndex } = useSelector(state => state.tabInfo);

    const [visible, setVisible] = useState(false);
    const [projectId, setProjectId] = useState(null);
    const [versionId, setVersionId] = useState(null);

    const _setSortType = (sortType) => {
        dispatch(setSortType({sortType}));
    }
    
    const _setTabIndex = (tabIndex) => {
        dispatch(setTabIndex({tabIndex}))
    }

    const _openPanel = (projectId, versionId) => {
        dispatch(openPanel({ projectId, versionId }));
    };

    const _openModal = (projectId, versionId) => {
        setProjectId(projectId);
        setVersionId(versionId);
        setVisible(true);
    }

    const assignTabClassName = (curTabIndex) => {
        if (tabIndex === curTabIndex) {
            return SELECTED_TAB_CLASSNAME;
        } 
        return DESELECTED_TAB_CLASSNAME;
    }

    return (
        <div>
            <Tabs
                selectedIndex={tabIndex}
                onSelect={index => _setTabIndex(index)}
                selectedTabPanelClassName="rounded-md mx-auto p-10 bg-white border-t-2 border-black"
                className='w-2/3 mx-auto'
            >
                <TabList className="border-black mt-5 px-2 flex justify-evenly text-center">
                    <Tab className={assignTabClassName(0)}>
                        My Studio
                    </Tab>
                    <Tab className={assignTabClassName(1)}>
                        Browse
                    </Tab>
                    {/* <Tab className={assignTabClassName(2)}>
                        Contributions
                    </Tab> */}
                </TabList>
                
                {
                    //My Projects Page
                }
                <TabPanel >
                    <h1 className="p-10 text-center">
                        My Projects
                    </h1>
                    <MusicList 
                        headers={['projectIcon', 'trackTitle', 'tags',  'owner', 'cntVersions', 'cntCollab', 'updated']}
                        votes={false}
                        className={"max-h-96"}
                        transform={TRANSFORM_OWNER}
                        panel={false}
                        onRowClick={_openPanel}
                    />
                    <div className="flex justify-center m-5">    
                        <GenericButton
                            title={"Create New Project"} 
                            className="text-xl w-2/5 p-2" 
                            onClick = {() => history.push('/create_project')}
                        />
                    </div>

                    <h1 className="p-10 text-center">
                        My Collaborations
                    </h1>
                    <MusicList 
                        headers={['playButton', 'trackTitle', 'tags', 'owner', 'duration', 'updated']}
                        votes={true}
                        className={"max-h-96"}
                        transform={TRANSFORM_AUTHOR}
                        panel={false}
                        onRowClick={_openModal}
                    />
                    {
                        visible ? <VersionModal onClose={() => setVisible(false)} projectId={projectId}  versionId={versionId} fromHomepage={true}/> : null
                    }
                    {/* <div className="flex justify-center m-5">    
                        <GenericButton title={"Browse"} className="text-xl w-1/5 p-2" onClick={() => _setTabIndex(1)}/>
                    </div> */}
                    {/* <h1 className="p-10 text-center">
                        My Comments
                    </h1> */}
                </TabPanel>
                
                {
                    //Browse Page
                }
                <TabPanel>
                    <SearchBar
                        placeholder = "Search for Tags"
                    />
                    <div className="flex flex-justify m-5">
                        <GenericButton
                            title={"Most Popular"}
                            className={"text-l mx-auto w-1/5 p-2 bg-" + (sortType === TRANSFORM_POPULAR ? " bg-indigo-600 border-4 border-pink-400": "")}
                            onClick={() => _setSortType(TRANSFORM_POPULAR)}/>
                        <GenericButton
                            title={"Most Recent"}
                            className={"text-l mx-auto w-1/5 p-2" + (sortType === TRANSFORM_RECENT ? " bg-indigo-600 border-4 border-pink-400": "")} 
                            onClick={() => _setSortType(TRANSFORM_RECENT)}
                        />
                    </div>                    
                    <MusicList
                        headers={['projectIcon', 'trackTitle', 'tags', 'owner', 'cntVersions', 'cntCollab']}
                        votes={false}
                        search={true}
                        transform={sortType}
                        panel={false}
                        onRowClick={_openPanel}
                    />
                </TabPanel>
            </Tabs>
            
            <RightPanel/>
        </div>
    );
}

export default withHeader(Homepage);
