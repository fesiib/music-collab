import { firebaseApp, database } from "./firebase";
import { updateProfile, updateProject } from "../reducers/database";
import randomString from "./randomString";

const safe = (opt1, opt2) => {
    if (opt1 === undefined)
        return opt2;
    return opt1;
}

const dictToList = (dict) => {
    if (dict === undefined || dict === null || typeof dict != 'object') {
        return [];
    }
    console.log(dict);
    return Object.keys(dict).map((key) => {
        return dict[key];
    });
}

export function fetchDatabase(dispatch) {
    const projectsRef = database.ref('database/projects');
    const profilesRef = database.ref('database/profiles');

    projectsRef.on('child_added', (snapshot) => {
        if (!snapshot.exists()) {
            return;
        }
        const projectId = snapshot.key;
        const project = snapshot.val();
        const data = {
            metaInfo: {
                ...project.metaInfo,
                creationTime: new Date(project.metaInfo.creationTime),
                lastModified: new Date(project.metaInfo.lastModified),
                tags: dictToList(project.metaInfo.tags),
            },
            versions: {
                ...project.versions,
            }
        };
        for (let versionId in data.versions) {
            const version = data.versions[versionId];
            data.versions[versionId] = {
                comments: {},
                ...version,
                metaInfo: {
                    ...version.metaInfo,
                    creationTime: new Date(version.metaInfo.creationTime),
                    lastModified: new Date(version.metaInfo.lastModified),
                },
                tracks: dictToList(version.tracks),
            };
            for (let commentId in data.versions[versionId].comments) {
                const comment = data.versions[versionId].comments[commentId];
                data.versions[versionId].comments[commentId] = {
                    parentCommentId: null,
                    ...comment,
                    creationTime: new Date(comment.creationTime),
                }
            }
        }
        console.log('add project', projectId, data);
        dispatch(updateProject({
            projectId,
            data,
        }));  
    });
    projectsRef.on('child_changed', (snapshot) => {
        if (!snapshot.exists()) {
            return;
        }
        const projectId = snapshot.key;
        const project = snapshot.val();
        const data = {
            metaInfo: {
                ...project.metaInfo,
                creationTime: new Date(project.metaInfo.creationTime),
                lastModified: new Date(project.metaInfo.lastModified),
                tags: dictToList(project.metaInfo.tags),
            },
            versions: {
                ...project.versions,
            }
        };
        for (let versionId in data.versions) {
            const version = data.versions[versionId];
            data.versions[versionId] = {
                comments: {},
                ...version,
                metaInfo: {
                    ...version.metaInfo,
                    creationTime: new Date(version.metaInfo.creationTime),
                    lastModified: new Date(version.metaInfo.lastModified),
                },
                tracks: dictToList(version.tracks),
            };
            for (let commentId in data.versions[versionId].comments) {
                const comment = data.versions[versionId].comments[commentId];
                data.versions[versionId].comments[commentId] = {
                    parentCommentId: null,
                    ...comment,
                    creationTime: new Date(comment.creationTime),
                }
            }
        }
        console.log('update project', projectId, data);
        dispatch(updateProject({
            projectId,
            data,
        }));
    })

    profilesRef.on('child_added', (snapshot) => {
        if (!snapshot.exists()) {
            return;
        }
        const userId = snapshot.key;
        const profile = snapshot.val();
        const data = {
            ...profile,
            projectIds: dictToList(profile.projectIds),
            versionIds: dictToList(profile.versionIds),
            commentIds: dictToList(profile.commentIds),
        };
        console.log('add user', userId, data);
        dispatch(updateProfile({
            userId,
            data,
        }));   
    });
    profilesRef.on('child_changed', (snapshot) => {
        if (!snapshot.exists()) {
            return;
        }
        const userId = snapshot.key;
        const profile = snapshot.val();
        const data = {
            ...profile,
            projectIds: dictToList(profile.projectIds),
            versionIds: dictToList(profile.versionIds),
            commentIds: dictToList(profile.commentIds),
        };
        console.log('add user', userId, data);
        dispatch(updateProfile({
            userId,
            data,
        })); 
    })
}


/* payload format
    ownerId,
    trackTitle,
    tags,
    description,
    backgroundImage
*/
export function addProject(payload) {
    const time = new Date().toString();

    const projectId = 'project' + randomString()
    const ownerId = payload.ownerId
    const versionId = 'version' + randomString()
    const authorId = ownerId

    const version = {
        metaInfo: {
            authorId: authorId,
            contributionMessage: safe(payload.contributionMessage, 'No message'),
            parentVersionId: safe(payload.parentVersionId, null),
            duration: safe(payload.duration, 230),

            votes: 0,
            creationTime: time,
            lastModified: time
        },
        tracks: safe(payload.tracks, [{url: null, type: null, duration: 0}]),
        comments: {}
    }

    const project = {
        metaInfo: {
            ownerId: ownerId,
            trackTitle: safe(payload.trackTitle, 'No title'),
            tags: safe(payload.tags, []),
            description: safe(payload.description, 'No description'),
            backgroundImage: safe(payload.backgroundImage, null),

            creationTime: time,
            lastModified: time
        },
        versions: {
            [versionId]: version
        }
    }

    return async function asyncAddProject() {
        const updates = {};

        const projectRefPath = 'database/projects/' + projectId;
        const projectIdsList = database.ref('database/profiles/' + ownerId + '/projectIds');
        const versionIdsList = database.ref('database/profiles/' + ownerId + '/versionIds');
        const newProjectIdRefPath = 'database/profiles/' + ownerId + '/projectIds/' + projectIdsList.push().key;
        const newVersionIdRefPath = 'database/profiles/' + ownerId + '/versionIds/' + versionIdsList.push().key;


        updates[projectRefPath] = project;
        updates[newProjectIdRefPath] = projectId;
        updates[newVersionIdRefPath] = {projectId, versionId};
        console.log(updates);
        database.ref().update(updates);
    }; 
}

export function addVersion(payload) {
    const projectId = payload.projectId;
    const versionId = 'version' + randomString();
    const authorId = payload.authorId;

    const time = new Date().toString();

    const version = {
        metaInfo: {
            authorId: payload.authorId,
            contributionMessage: safe(payload.contributionMessage, 'No message'),
            parentVersionId: safe(payload.parentVersionId, null),
            duration: safe(payload.duration, 0),

            votes: 0,
            creationTime: time,
            lastModified: time
        },
        tracks: payload.tracks,
        comments: {}
    };

    return async function asyncAddVersion() {
        const updates = {};

        const versionRefPath = 'database/projects/' + projectId + '/versions/' + versionId;
        const lastModifiedRefPath = 'database/projects/' + projectId + '/metaInfo/lastModified';

        const versionIdsList = database.ref('database/profiles/' + authorId + '/versionIds');
        const newVersionIdRefPath = 'database/profiles/' + authorId + '/versionIds/' + versionIdsList.push().key;


        updates[versionRefPath] = version;
        updates[lastModifiedRefPath] = time;
        updates[newVersionIdRefPath] = {projectId, versionId};

        database.ref().update(updates);
    };
}

export function addComment(payload) {
    if (payload.hasOwnProperty('audioSegment')) {
        payload.audioSegment = { start: 0, finish: 0 }
    }

    const time = new Date().toString();

    const projectId = payload.projectId;
    const versionId = payload.versionId;
    const commentId = 'comment' + randomString();
    const authorId = payload.authorId;
    const comment = {
        authorId: payload.authorId,
        commentMessage: payload.comment,
        parentCommentId: payload.parentCommentId,
        votes: 0,
        audioSegment: payload.audioSegment,
        creationTime: time
    };

    return async function asyncAddComment() {
        const updates = {};

        const commentRefPath = 'database/projects/' + projectId + '/versions/' + versionId + '/comments/' + commentId;
        const lastModifiedRefPath = 'database/projects/' + projectId + '/versions/' + versionId  + '/metaInfo/lastModified';

        const commentIdsList = database.ref('database/profiles/' + authorId + '/commentIds');
        const newCommentIdsList = 'database/profiles/' + authorId + '/commentIds/' + commentIdsList.push().key;


        updates[commentRefPath] = comment;
        updates[lastModifiedRefPath] = time;
        updates[newCommentIdsList] = {projectId, versionId, commentId};

        database.ref().update(updates);
    }
}

export function addProfile(payload) {
    const profileRef = database.ref('database/profiles/' + payload.userId);
    return async function asyncAddProfile() {
        console.log("profile")
        profileRef.transaction((profile) => {
            if (profile === null) {
                return {
                    metaInfo: {
                        name: payload.name,
                        communityRating: 0,
                        profileImage: payload.profileImage,
                    },
                    projectIds: [],
                    versionIds: [],
                    commentIds: []
                };
            }
            else {
                return profile;
            }
        });
    };
}

export function changeVoteVersion(payload) {
    const projectId = payload.projectId
    const versionId = payload.versionId

    const votesRef = database.ref('database/projects/' + projectId + '/versions/' + versionId + '/metaInfo/votes');
    return async function asyncChangeVoteVersion() {
        votesRef.transaction((votes) => {
            votes += payload.votes;
            return votes;
        });
    };
}

export function changeVoteComment(payload) {
    const projectId = payload.projectId
    const versionId = payload.versionId
    const commentId = payload.commentId

    const votesRef = database.ref('database/projects/' + projectId + '/versions/' + versionId + '/comments/' + commentId + '/votes');
    return async function asyncChangeVoteComment() {
        votesRef.transaction((votes) => {
            votes += payload.votes;
            return votes;
        });
    };
}

// function writeUserData(userId, name, email, imageUrl) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//         username: name,
//         email: email,
//         profile_picture : imageUrl
//     });
// }

// import { getDatabase, ref, runTransaction } from "firebase/database";

// function toggleStar(uid) {
//     const postRef = ref(db, '/posts/foo-bar-123');

//     runTransaction(postRef, (post) => {
//         if (post) {
//             if (post.stars && post.stars[uid]) {
//                 post.starCount--;
//                 post.stars[uid] = null;
//             } else {
//                 post.starCount++;
//                 if (!post.stars) {
//                     post.stars = {};
//                 }
//                 post.stars[uid] = true;
//             }
//         }
//         return post;
//     });
// }

// function writeNewPost(uid, username, picture, title, body) {
//     const db = getDatabase();
  
//     // A post entry.
//     const postData = {
//         author: username,
//         uid: uid,
//         body: body,
//         title: title,
//         starCount: 0,
//         authorPic: picture
//     };
  
//     // Get a key for a new Post.
//     const newPostKey = push(child(ref(db), 'posts')).key;
  
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
//     return update(ref(db), updates);
//}