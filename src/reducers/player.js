import testAudio from '../data/music-test.mp3';

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
    title: 'test',
    audio: testAudio,
};

const player = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUDIO: {
            return {
                ...state,
                audio: action.payload.audio,
                title: action.payload.title,
            }
        }
        default:
            return state;
    }
}

export default player;