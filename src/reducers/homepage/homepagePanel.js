const OPEN_PANEL = "OPEN_PANEL";
const CLOSE_PANEL = "CLOSE_PANEL";

export const openPanel = () => ({
    type: OPEN_PANEL,
});


export const closePanel = () => ({
    type: CLOSE_PANEL,
});

const initialState = {
    panelState: false,
};


const homepagePanel = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PANEL: {
            return {
                ...state,
                panelState: true,
            }
        }
        case CLOSE_PANEL: {
            return {
                ...state,
                panelState: false,
            }
        }
        default:
            return state;
    }
}

export default homepagePanel;