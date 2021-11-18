const PLAY = "PLAY";
const PAUSE = "PAUSE";
const SET_AUDIO = "SET_AUDIO";
const STARTED_OVER = "STARTED_OVER";

export const setAudio = (payload) => ({
    type: SET_AUDIO,
    payload,
});

export const playMusic = () => ({
    type: PLAY,
});

export const pauseMusic = () => ({
    type: PAUSE,
});

export const startedOver = () => ({
    type: STARTED_OVER,
});

const initialState = {
    versionId: null,
    projectId: null,
    playing: false,
    startOver: false,
};

const player = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUDIO: {
            if (state.versionId !== action.payload.versionId
                || state.projectId !== action.payload.projectId
            ) {
                return {
                    ...state,
                    versionId: action.payload.versionId,
                    projectId: action.payload.projectId,
                    playing: true,
                    startOver: true,
                }
            }
            return state;
        }
        case STARTED_OVER: {
            return {
                ...state,
                startOver: false,
            }
        }
        case PLAY: {
            if (!state.playing) {
                return {
                    ...state,
                    playing: true,
                }
            }
            return state;
        }
        case PAUSE: {
            if (state.playing) {
                return {
                    ...state,
                    playing: false,
                }
            }
            return state;
        }
        default:
            return state;
    }
}

export default player;