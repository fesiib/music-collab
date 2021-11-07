import React, { useState } from 'react';

import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';

import MusicList from '../components/MusicList';
import SearchBar from '../components/SearchBar';
import withHeader from '../hocs/withHeader';

const SELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-black bg-white border-t-2 border-l-2 border-r-2 border-black";
const DESELECTED_TAB_CLASSNAME = "rounded-sm w-1/6 text-white bg-indigo-600";

function Homepage(props) {
    const [tabIndex, setTabIndex] = useState(1);

    const assignTabClassName = (curTabIndex) => {
        if (tabIndex == curTabIndex) {
            return SELECTED_TAB_CLASSNAME;
        } 
        return DESELECTED_TAB_CLASSNAME;
    }

    return (
        <Tabs
            selectedIndex={tabIndex}
            onSelect={index => setTabIndex(index)}
            selectedTabPanelClassName="rounded-md mx-auto p-10 bg-white border-t-2 border-black"
            className='w-2/3 mx-auto'
        >
            <TabList className="border-black cursor-pointer mt-5 px-2 flex justify-around text-center">
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
            </TabPanel>
            <TabPanel>
                <SearchBar
                    placeholder = "Search for Music, Authors, and Tags"
                />
                <MusicList/>
            </TabPanel>
            <TabPanel>
                Contributions
                Comments
            </TabPanel>
        </Tabs>
    );
}

export default withHeader(Homepage);
