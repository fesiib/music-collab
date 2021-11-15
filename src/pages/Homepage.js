import React, { useState } from 'react';

import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';

import GenericButton from '../components/GenericButton';
import MusicList from '../components/MusicList';
import SearchBar from '../components/SearchBar';
import withHeader from '../hocs/withHeader';
import { useDispatch, useSelector } from 'react-redux';
import { closePanel, openPanel } from '../reducers/homepagePanel';

const albumBackgroundURL = 'https://www.rollingstone.com/wp-content/uploads/2018/09/beatles-white-album-.jpg';

const SELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-black bg-white border-t-2 border-l-2 border-r-2 border-black";
const DESELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600";

function Homepage(props) {
    const dispatch = useDispatch();

    const [tabIndex, setTabIndex] = useState(1);

    const { panelState } = useSelector(state => state.homepagePanel);

    const _closePanel = () => {
        dispatch(closePanel());
    }

    const _openPanel = () => {
        dispatch(openPanel());
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
                onSelect={index => setTabIndex(index)}
                selectedTabPanelClassName="rounded-md mx-auto p-10 bg-white border-t-2 border-black"
                className='w-2/3 mx-auto'
            >
                <TabList className="border-black mt-5 px-2 flex justify-around text-center">
                    <Tab className={assignTabClassName(0)}>
                        My Projects
                    </Tab>
                    <Tab className={assignTabClassName(1)}>
                        Browse
                    </Tab>
                    <Tab className={assignTabClassName(2)}>
                        Contributions
                    </Tab>
                </TabList>
                <TabPanel>
                    My Projects
                    <GenericButton title={"Create New Project"} className="text-xl mx-auto w-2/5 p-2" />
                </TabPanel>
                <TabPanel>
                    <SearchBar
                        placeholder = "Search for Music, Authors, and Tags"
                    />
                    <div className="flex flex-justify m-5">
                        <GenericButton title={"Most Popular"} className="text-l mx-auto w-1/5 p-2" />
                        <GenericButton title={"Weekly Top"} className="text-l mx-auto w-1/5 p-2" />
                    </div>                    
                    <MusicList/>
                </TabPanel>
                <TabPanel>
                    Contributions
                    Comments
                </TabPanel>
            </Tabs>
            <SlidingPanel
                type={'right'}
                isOpen={panelState}
                size={30}
                backdropClicked={_closePanel}
                panelClassName='bg-white'
            >
                <div className='bg-white'>
                    <div style={{
                        backgroundImage:`url(${albumBackgroundURL})`,
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
                    <GenericButton title={"Close"} onClick={_closePanel} />
                    <div>
                        Music Title
                    </div>
                    <div>
                        author
                    </div>
                    <MusicList headers={['author', 'duration']} voting={true} className={"h-96"}/>
                </div>
            </SlidingPanel>
        </div>
    );
}

export default withHeader(Homepage);
