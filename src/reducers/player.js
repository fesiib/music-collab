const PLAY = "PLAY";
const PAUSE = "PAUSE";

export const playMusic = () => ({
    type: PLAY,
});


export const pauseMusic = () => ({
    type: PAUSE,
});

const initialState = {
    cnt: 0,
};


const player = (state = initialState, action) => {
    switch (action.type) {
        default:
                return state;
    }
}

export default counter;