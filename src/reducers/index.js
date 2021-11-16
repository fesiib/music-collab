import {combineReducers} from 'redux';
//import user from "./user";

import counter from "./counter";
import homepagePanel from './homepage/homepagePanel';
import tabInfo from './homepage/tabInfo';
import database from './database';
import player from './player';

const RESET_APP = "RESET_APP";

const appReducer = combineReducers({
    counter: counter,
    homepagePanel: homepagePanel,
    tabInfo: tabInfo,
    database: database,
    player: player,
});

export const resetApp = () => ({
    type: RESET_APP,
});

const rootReducer = (state, action) => {
    if (action.type === RESET_APP) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

export default rootReducer;