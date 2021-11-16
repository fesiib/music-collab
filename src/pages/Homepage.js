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
import { setTabIndex } from '../reducers/tabInfo';

const albumBackgroundURL = 'https://www.rollingstone.com/wp-content/uploads/2018/09/beatles-white-album-.jpg';

const SELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-black bg-white border-t-2 border-l-2 border-r-2 border-black";
const DESELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600";

function Homepage(props) {
    const dispatch = useDispatch();

    const { panelState } = useSelector(state => state.homepagePanel);
    const { tabIndex } = useSelector(state => state.tabInfo);

    const _closePanel = () => {
        dispatch(closePanel());
    }

    const _openPanel = () => {
        dispatch(openPanel());
    }
    
    const _setTabIndex = (tabIndex) => {
        dispatch(setTabIndex({tabIndex}))
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
                        My Projects
                    </Tab>
                    <Tab className={assignTabClassName(1)}>
                        Browse
                    </Tab>
                    <Tab className={assignTabClassName(2)}>
                        Contributions
                    </Tab>
                </TabList>
                
                {
                    //My Projects Page
                }
                <TabPanel>
                    <h1 className="p-10 text-center">
                        My Projects
                    </h1>
                    <MusicList headers={
                        ['trackTitle', 'genre', 'cntVersions', 'cntCollab', 'duration']
                    } votes={true} className={"h-96"}/>
                    <div className="flex justify-center m-5">    
                        <GenericButton title={"Create New Project"} className="text-xl w-2/5 p-2" />
                    </div>
                </TabPanel>
                
                {
                    //Browse Page
                }
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
                
                {
                    //Contributions Page
                }
                <TabPanel>
                    <h1 className="p-10 text-center">
                        Contributions
                    </h1>
                    <MusicList headers={
                        ['trackTitle', 'genre', 'cntVersions', 'cntCollab', 'duration']
                    } votes={true} className={"h-96"}/>
                    <h2 className="p-3 text-center">
                        My Comments
                    </h2>
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
                    <h2 className="pt-5 pl-5 text-left">
                        Music Title
                    </h2>
                    <h3 className="pl-5 pb-5 text-left">
                        Author
                    </h3>
                    <MusicList headers={['author', 'duration']} votes={true} className={"h-96 "}/>
                    <div>
                        Contributors
                    </div>
                </div>
            </SlidingPanel>
        </div>
    );
}

export default withHeader(Homepage);
