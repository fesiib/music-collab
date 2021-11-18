const PLAY = "PLAY";
const PAUSE = "PAUSE";
const SET_AUDIO = "SET_AUDIO";

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

const initialState = {
    versionId: null,
    projectId: null,
    playing: false,
};

const player = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUDIO: {
            return {
                ...state,
                versionId: action.payload.versionId,
                projectId: action.payload.projectId,
                playing: false,
            }
        }
        case PLAY: {
            if (!state.playing) {
                return {
                    ...state,
                    playing: true,
                }
            }
        }
        case PAUSE: {
            if (state.playing) {
                return {
                    ...state,
                    playing: false,
                }
            }
        }
        default:
            return state;
    }
}

export default player;