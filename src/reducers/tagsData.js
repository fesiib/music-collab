const ADD_NEW_TAG = "ADD_NEW_TAG";

export const addNewTagLocal = (payload) => ({
    type: ADD_NEW_TAG,
    payload
});

const initialState = {
    data: [
        // {value: 'rock', label: 'Rock'},
        // {value: 'pop', label: 'Pop'},
        // {value: 'guitar', label: 'Guitar'},
    ],
};


const tagsData = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_TAG: {
            const value = action.payload.value;
            const label = action.payload.label;
            const newData = new Set([...state.data, {value, label}]);
            return {
                ...state,
                data: Array.from(newData),
            }
        }
        default:
            return state;
    }
}

export default tagsData;