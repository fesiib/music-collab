const SET_TAB = "SET_TAB";

export const setTabIndex = (payload) => ({
    type: SET_TAB,
    payload,
});

const initialState = {
    tabIndex: 1,
};

const tabInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_TAB: {
            return {
                ...state,
                tabIndex: action.payload.tabIndex,
            };
        }
        default:
            return state;
    }
}

export default tabInfo;