import {combineReducers} from 'redux';
//import user from "./user";

import counter from "./counter";
import homepagePanel from './homepagePanel';

const RESET_APP = "RESET_APP";

const appReducer = combineReducers({
    counter: counter,
    homepagePanel: homepagePanel,
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