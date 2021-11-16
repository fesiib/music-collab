const CREATE_PROJECT = "CREATE_PROJECT";
const REMOVE_PROJECT = "REMOVE_PROJECT";

const CONTRIBUTE_VERSION = "CONTRIBUTE_VERSION";
const REMOVE_VERSION = "REMOVE_VERSION";

const ADD_COMMENT = "ADD_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";

const UPVOTE_PROJECT = "UPVOTE_PROJECT";
const DOWNVOTE_PROJECT = "DOWNVOTE_PROJECT";

const UPVOTE_PROJECT = "UPVOTE_VERSION";
const DOWNVOTE_PROJECT = "DOWNVOTE_VERSION";

const UPVOTE_COMMENT = "UPVOTE_COMMENT";
const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";


/*
PROJECT 

const project = {
    metaInfo: {
        author: "",
        trackTitle: "",
        genre: "",
        description: "",
    }

    //sorted by popularity
    versions: [
        {
            author: "",
            contributionMessage: "",
            timeStamp: 0,
            parentVersion: -1,
            votes: 0,
            tracks: [
                {?}
            ]
            comments: [
                {
                    author: "",
                    comment: "",
                    timeStamp: 0,
                    parentComment: -1,
                    votes: 0,
                    audioSegment: (1, 2)
                }
            ]
        }
    ]
}

*/


export const createProject = () => ({
    type: CREATE_PROJECT,
});

const initialState = {
    cnt: 0,
    projects: [],
};


const projects = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROJECT: {
            return {
                ...state,
                cnt: state.cnt + 1,
            }
        }
        default:
                return state;
    }
}

export default counter;