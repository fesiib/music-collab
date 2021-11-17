const SET_TAB = "SET_TAB";
const SET_TAGS = "SET_TAGS";

export const setTabIndex = (payload) => ({
    type: SET_TAB,
    payload,
});

export const setTags = (payload) => ({
    type: SET_TAGS,
    payload
});

const initialState = {
    tabIndex: 1,
    searchTags: [],
};

const tabInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_TAB: {
            return {
                ...state,
                tabIndex: action.payload.tabIndex,
            };
        }
        case SET_TAGS: {
            return {
                ...state,
                searchTags: action.payload.tags,
            }
        }
        default:
            return state;
    }
}

export default tabInfo;