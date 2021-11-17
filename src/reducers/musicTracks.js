const PLAY = "PLAY";
const PAUSE = "PAUSE";

export const playTracks = () => ({
    type: PLAY,
});


export const pauseTracks = () => ({
    type: PAUSE,
});

const initialState = {
    playAllTracks: false,
};


const playAllTracks = (state = initialState, action) => {
    switch (action.type) {
        case PAUSE: {
            return {
                ...state,
                playAllTracks: false
            }
        }
        case PLAY: {
            return {
                ...state,
                playAllTracks: true
            }
        }
        default:
                return state;
    }
}

export default playAllTracks;