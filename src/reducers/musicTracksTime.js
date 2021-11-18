const SET_TIME = "SET_TIME";



export const setTimeAllTracks = (payload) => ({
    type: SET_TIME,
    payload,
});

const initialState = {
    timeAllTracks: null,
};

// timeAllTracks
const timeAllTracks = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIME: {
            return {
                ...state,
                timeAllTracks: action.payload.timeAllTracks,
            }
        }
        default:
                return state;
    }
}

export default timeAllTracks;