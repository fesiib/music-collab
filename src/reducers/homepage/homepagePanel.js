import { TRANSFORM_POPULAR } from "../../components/MusicList";

const OPEN_PANEL = "OPEN_PANEL";
const CLOSE_PANEL = "CLOSE_PANEL";
const SET_SORT_TYPE = "SET_SORT_TYPE";

export const openPanel = (payload) => ({
    type: OPEN_PANEL,
    payload,
});


export const closePanel = () => ({
    type: CLOSE_PANEL,
});

export const setSortType = (payload) => ({
    type: SET_SORT_TYPE,
    payload,
});

const initialState = {
    panelState: false,
    sortType: TRANSFORM_POPULAR,
    versionId: "",
    projectId: "",
    collaborators: new Set(),
};


const homepagePanel = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PANEL: {
            return {
                ...state,
                panelState: true,
                versionId: action.payload.versionId,
                projectId: action.payload.projectId,
                collaborators: action.payload.collaborators,
            }
        }
        case CLOSE_PANEL: {
            return {
                ...state,
                panelState: false,
            }
        }
        case SET_SORT_TYPE: {
            return {
                ...state,
                sortType: action.payload.sortType,
            }
        }
        default:
            return state;
    }
}

export default homepagePanel;