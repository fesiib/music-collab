import randomString from "../services/randomString";

const ADD_AUTHOR = "ADD_AUTHOR";
const REMOVE_AUTHOR = "REMOVE_AUTHOR";

const ADD_PROJECT = "ADD_PROJECT";
const REMOVE_PROJECT = "REMOVE_PROJECT";

const ADD_VERSION = "ADD_VERSION";
const REMOVE_VERSION = "REMOVE_VERSION";

const ADD_COMMENT = "ADD_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";

const CHANGE_VOTE_VERSION = "CHANGE_VOTE_VERSION";
const CHANGE_VOTE_COMMENT = "CHANGE_VOTE_COMMENT";

const PROJECT_RATING = 3;
const VERSION_RATING = 2;
const COMMENT_RATING = 1;

const DUMMY_PROFILE_0 = {
    metaInfo: {
        author: "Me",
        communityRating: 2,
    },
    projectIds: [],
    versionIds: [],
    commentIds: [],
}

const DUMMY_PROFILE_1 = {
    metaInfo: {
        author: "Helena",
        communityRating: 0,
    },
    projectIds: ['sunnyDay'],
    versionIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay1',
    }],
    commentIds: [],
}

const DUMMY_PROFILE_2 = {
    metaInfo: {
        author: "Bob",
        communityRating: 1,
    },
    projectIds: [],
    versionIds: [],
    commentIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay1',
        commentId: 'comment1',
    }]
};

const DUMMY_PROJECT_1 = {
    metaInfo: {
        authorId: 'helena',
        trackTitle: "Sunny day",
        genre: "Pop",
        description: "It is a pop music",

        creationTime: new Date(0),
        lastModified: new Date(0),
    },

    //sorted by popularity
    versions: {
        sunnyDay1: {
            metaInfo: {
                authorId: 'helena',
                contributionMessage: "Draft version (very first)",
                parentVersionId: null,
                duration: 100,

                votes: 0,
                creationTime: new Date(0),
                lastModified: new Date(0),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'piano',
                }
            ],
            
            comments: {
                comment1: {
                    authorId: 'bob',
                    commentMessage: "This is amazing!",
                    parentCommentId: null,
                    votes: 0,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(1),
                }
            }
        }
    },
}

export const addAuthor = (payload) => ({
    type: ADD_AUTHOR,
    payload,
});

export const removeAuthor = (payload) => ({
    type: REMOVE_AUTHOR,
    payload,
});

export const addProject = (payload) => ({
    type: ADD_PROJECT,
    payload,
});

export const removeProject = (payload) => ({
    type: REMOVE_PROJECT,
    payload,
});

export const addVersion = (payload) => ({
    type: ADD_VERSION,
    payload,
});

export const removeVersion = (payload) => ({
    type: REMOVE_VERSION,
    payload,
});

export const addComment = (payload) => ({
    type: ADD_COMMENT,
    payload,
});

export const removeComment = (payload) => ({
    type: REMOVE_COMMENT,
    payload,
});

export const changeVoteVersion = (payload) => ({
    type: CHANGE_VOTE_VERSION,
    payload,
});

export const changeVoteComment = (payload) => ({
    type: CHANGE_VOTE_COMMENT,
    payload,
});

function cleanUpProject(projects, authors, projectId) {
    let newProjects = projects;
    let newAuthors = authors;
    for (let versionId in projects[projectId].versions) {
        const result = cleanUpVersion(newProjects, newAuthors, projectId, versionId);
        newProjects = result.newProjects;
        newAuthors = result.newAuthors;
    }
    const authorId = newProjects[projectId].metaInfo.authorId;

    delete newProjects[projectId];
    for (let i = 0; i < newAuthors[authorId].projectIds.length; i++) {
        const pId = newAuthors[authorId].projectIds[i];
        if (pId === projectId) {
            newAuthors[authorId].projectIds = [...newAuthors[authorId].projectIds.slice(0, i), ...newAuthors[authorId].projectIds.slice(i+1)];
            break;
        }
    }

    newAuthors = recalcRating(newProjects, newAuthors, authorId);
    return {newProjects, newAuthors};
}

function cleanUpVersion(projects, authors, projectId, versionId) {
    let newProjects = projects;
    let newAuthors = authors;
    for (let commentId in projects[projectId].versions[versionId].comments) {
        const result = cleanUpComment(newProjects, newAuthors, projectId, versionId, commentId);
        newProjects = result.newProjects;
        newAuthors = result.newAuthors;
    }
    const authorId = newProjects[projectId].versions[versionId].metaInfo.authorId;

    delete newProjects[projectId].versions[versionId];
    for (let i = 0; i < newAuthors[authorId].versionIds.length; i++) {
        const vObj = newAuthors[authorId].versionIds[i];
        if (vObj.projectId === projectId && vObj.versionId === versionId) {
            newAuthors[authorId].versionIds = [...newAuthors[authorId].versionIds.slice(0, i), ...newAuthors[authorId].versionIds.slice(i+1)];
            break;
        }
    }

    newAuthors = recalcRating(newProjects, newAuthors, authorId);
    return {newProjects, newAuthors};
}

function cleanUpComment(projects, authors, projectId, versionId, commentId) {
    let newProjects = projects;
    let newAuthors = authors;
    const authorId = newProjects[projectId].versions[versionId].comments[commentId].authorId;

    delete newProjects[projectId].versions[versionId].comments[commentId];
    for (let i = 0; i < newAuthors[authorId].commentIds.length; i++) {
        const cObj = newAuthors[authorId].commentIds[i];
        if (cObj.projectId === projectId && cObj.versionId === versionId && cObj.commentId === commentId) {
            newAuthors[authorId].commentIds = [...newAuthors[authorId].commentIds.slice(0, i), ...newAuthors[authorId].commentIds.slice(i+1)];
            break;
        }
    }

    newAuthors = recalcRating(newProjects, newAuthors, authorId);
    return {newProjects, newAuthors};
}

function recalcRating(projects, authors, authorId) {
    let rating = 0;
    let maxVersion = 0;
    for (let projectId of authors[authorId].projectIds) {
        for (let versionId in projects[projectId].versions) {
            let cur = projects[projectId].versions[versionId].metaInfo.votes;
            if (maxVersion < cur) {
                maxVersion = cur;
            }
        }
    }
    rating += maxVersion * PROJECT_RATING;
    for (let obj of authors[authorId].versionIds) {
        const projectId = obj.projectId;
        const versionId = obj.versionId;
        let cur = projects[projectId].versions[versionId].metaInfo.votes;
        if (cur < 0) {
            cur = 0;
        }
        rating += cur * VERSION_RATING;
    }
    for (let obj of authors[authorId].commentIds) {
        const projectId = obj.projectId;
        const versionId = obj.versionId;
        const commentId = obj.commentId;
        let cur = projects[projectId].versions[versionId].comments[commentId].votes;
        if (cur < 0) {
            cur = 0;
        }
        rating += cur * COMMENT_RATING;
    }
    authors[authorId].metaInfo.communityRating = rating;
    return authors;
}

const initialState = {
    projects: {
        sunnyDay: DUMMY_PROJECT_1,
    },
    authors: {
        me: DUMMY_PROFILE_0,
        helena: DUMMY_PROFILE_1,
        bob: DUMMY_PROFILE_2,
    }
};


const database = (state = initialState, action) => {
    switch (action.type) {
        /* payload format
            authorId,
            trackTitle,
            genre,
            description,
        */
        case ADD_PROJECT: {
            const projectId = 'project' + randomString();
            const authorId = action.payload.authorId;

            const project = {
                metaInfo: {
                    ...action.payload,
                    creationTime: new Date(),
                    lastModified: new Date(),
                },
                versions: {},
            };

            let newProjects = {...state.projects};
            newProjects[projectId] = project;

            let newAuthors = { ...state.authors };
            newAuthors[authorId].projectIds.push(projectId);
            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }

        /* payload format
            projectId,
        */
        case REMOVE_PROJECT: {
            const projectId = action.payload.projectId;
            const { newProjects, newAuthors } = cleanUpProject({...state.projects}, {...state.authors}, projectId);
            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }

        /* payload format
            projectId,
            authorId,
            contributionMessage,
            parentVersionId,
            duration,
            tracks {url: '', type: ??},
        */
        case ADD_VERSION: {
            const projectId = action.payload.projectId;
            const versionId = 'version' + randomString();
            const authorId = action.payload.authorId;
            const version = {
                metaInfo: {
                    authorId: action.payload.authorId,
                    contributionMessage: action.payload.contributionMessage,
                    parentVersionId: action.payload.parentVersionId,
                    duration: action.payload.duration,

                    votes: 0,
                    creationTime: new Date(),
                    lastModified: new Date(),    
                },
                tracks: action.payload.tracks,
                comments: {},
            };

            let newProjects = {...state.projects};
            newProjects[projectId].versions[versionId] = version;
            
            let newAuthors = {...state.authors};
            newAuthors[authorId].versionIds.push({
                projectId,
                versionId,
            });

            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }

        /* payload format
            projectId,
            versionId,
        */
        case REMOVE_VERSION: {
            const projectId = action.payload.projectId;
            const versionId = action.payload.versionId;
            const { newProjects, newAuthors } = cleanUpVersion({...state.projects}, {...state.authors}, projectId, versionId);
            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }

        /* payload format
            projectId,
            versionId,
            authorId,
            commentMessage,
            parentCommentId,
            audioSegment {start: 0, finish: 0}
            duration,
            tracks {url: '', type: ??},
        */
        case ADD_COMMENT: {
            if (action.payload.hasOwnProperty('audioSegment')) {
                action.payload.audioSegment = {start: 0, finish: 0};
            }

            const projectId = action.payload.projectId;
            const versionId = action.payload.versionId;
            const commentId = 'comment' + randomString(); 
            const authorId = action.payload.authorId;
            const comment = {
                authorId: action.payload.authorId,
                commentMessage: action.payload.comment,
                parentCommentId: action.payload.parentCommentId,
                votes: 0,
                audioSegment: action.payload.audioSegment,
                creationTime: new Date(),
            };

            let newProjects = {...state.projects};
            newProjects[projectId].versions[versionId].comments[commentId] = comment;
            
            let newAuthors = {...state.authors};
            newAuthors[authorId].versionIds.push({
                projectId,
                versionId,
                commentId,
            });

            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }
        
        /* payload format
            projectId,
            versionId,
            commentId,
        */
        case REMOVE_COMMENT: {
            const projectId = action.payload.projectId;
            const versionId = action.payload.versionId;
            const commentId = action.payload.commentId;
            const { newProjects, newAuthors } = cleanUpComment({...state.projects}, {...state.authors}, projectId, versionId, commentId);
            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }


        /* payload format
            projectId,
            versionId,
            votes,
        */
        case CHANGE_VOTE_VERSION: {
            const projectId = action.payload.projectId;
            const versionId = action.payload.versionId;

            let newProjects = {...state.projects};

            newProjects[projectId].versions[versionId].metaInfo.votes += action.payload.votes;
            const authorId = newProjects[projectId].versions[versionId].metaInfo.authorId;
            const newAuthors = recalcRating(newProjects, {...state.authors}, authorId);
            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }

        /* payload format
            projectId,
            versionId,
            commentId,
            votes,
        */
        case CHANGE_VOTE_COMMENT: {
            const projectId = action.payload.projectId;
            const versionId = action.payload.versionId;
            const commentId = action.payload.commentId;

            let newProjects = {...state.projects};

            newProjects[projectId].versions[versionId].comments[commentId].votes += action.payload.votes;
            const authorId = newProjects[projectId].versions[versionId].comments[commentId].authorId;
            const newAuthors = recalcRating(newProjects, {...state.authors}, authorId);
            return {
                ...state,
                projects: newProjects,
                authors: newAuthors,
            };
        }
        default:
                return state;
    }
}

export default database;