import {combineReducers} from 'redux';
//import user from "./user";

import counter from "./counter";
import homepagePanel from './homepage/homepagePanel';
import tabInfo from './homepage/tabInfo';
import database from './database';
import player from './player';

import storage from 'redux-persist/lib/storage';

import playAllTracks from './musicTracks'
import timeAllTracks from "./musicTracksTime"


const RESET_APP = "RESET_APP";

const appReducer = combineReducers({
    counter: counter,
    homepagePanel: homepagePanel,
    tabInfo: tabInfo,
    database: database,
    player: player,
    playAllTracks: playAllTracks, 
    timeAllTracks, timeAllTracks,
});

export const resetApp = () => ({
    type: RESET_APP,
});

const rootReducer = (state, action) => {
    switch(action.type) {
        case RESET_APP:
            storage.removeItem('persist:root');
            return appReducer(undefined, action);
        default:
            return appReducer(state, action);
    }
}

export default rootReducer;