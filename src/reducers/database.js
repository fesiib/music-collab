import randomString from '../services/randomString'

const UPDATE_DATABASE = 'UPDATE_DATABASE'

const CREATE_PROFILE = 'CREATE_PROFILE'

const SET_USER = 'SET_USER'

const ADD_PROFILE = 'ADD_PROFILE'
const REMOVE_PROFILE = 'REMOVE_PROFILE'

const ADD_PROJECT = 'ADD_PROJECT'
const REMOVE_PROJECT = 'REMOVE_PROJECT'

const ADD_VERSION = 'ADD_VERSION'
const REMOVE_VERSION = 'REMOVE_VERSION'

const ADD_COMMENT = 'ADD_COMMENT'
const REMOVE_COMMENT = 'REMOVE_COMMENT'

const CHANGE_VOTE_VERSION = 'CHANGE_VOTE_VERSION'
const CHANGE_VOTE_COMMENT = 'CHANGE_VOTE_COMMENT'

const PROJECT_RATING = 3
const VERSION_RATING = 2
const COMMENT_RATING = 1

const DUMMY_PROFILE_0 = {
    metaInfo: {
        name: "Me",
        communityRating: 2,
        profileImage: "https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg",
    },
    projectIds: ['love', 'hate'],
    versionIds: [
        {
            projectId: 'love',
            versionId: 'love1',    
        },
        {
            projectId: 'hate',
            versionId: 'hate1',
        }
    ],
    commentIds: [],
}

const DUMMY_PROFILE_1 = {
    metaInfo: {
        name: "Helena",
        communityRating: 0,
        profileImage: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F00%2Fec%2F6b%2F00ec6b1a19a8dd9dee3949d4f7b09c1b.jpg&f=1&nofb=1",
    },
    projectIds: ['sunnyDay'],
    versionIds: [
        { 
            projectId: 'sunnyDay',
            versionId: 'sunnyDay1',
        },
        {
            projectId: 'love',
            versionId: 'love2',    
        },
        {
            projectId: 'hate',
            versionId: 'hate2',    
        }
    ],
    commentIds: [{ 
        projectId: 'love',
        versionId: 'love1',
        commentId: 'comment2',
    },
    { 
        projectId: 'hate',
        versionId: 'hate1',
        commentId: 'comment2',
    }
        ],
}

const DUMMY_PROFILE_2 = {
    metaInfo: {
        name: "Bob",
        communityRating: 1,
        profileImage: "https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg",
    },
    projectIds: [],
    versionIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay2',
    }],
    commentIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay1',
        commentId: 'comment1',
    },
    { 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay1',
        commentId: 'comment2',
    },
    { 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay1',
        commentId: 'comment3',
    },
    { 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay1',
        commentId: 'comment4',
    },
    { 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay1',
        commentId: 'comment5',
    },
        ]
};
const DUMMY_PROFILE_3 = {
    metaInfo: {
        name: "Michael",
        communityRating: 1,
        profileImage: "https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg",
    },
    projectIds: [],
    versionIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay3',
    }],
    commentIds: []
};
const DUMMY_PROFILE_4 = {
    metaInfo: {
        name: "Dobby",
        communityRating: 1,
        profileImage: "https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg",
    },
    projectIds: [],
    versionIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay4',
    }],
    commentIds: []
};
const DUMMY_PROFILE_5 = {
    metaInfo: {
        name: "Anna",
        communityRating: 1,
        profileImage: "https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg",
    },
    projectIds: [],
    versionIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay5',
    }],
    commentIds: []
};
const DUMMY_PROFILE_6 = {
    metaInfo: {
        name: "Herald",
        communityRating: 1,
        profileImage: "https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg",
    },
    projectIds: [],
    versionIds: [{ 
        projectId: 'sunnyDay',
        versionId: 'sunnyDay6',
    }],
    commentIds: []
};

const DUMMY_PROJECT_1 = {
    metaInfo: {
        ownerId: 'helena',
        trackTitle: "Sunny day",
        tags: [
            {label: "Pop", value: "pop"},
            {label: "Chill", value: "chill"},
        ],
        description: "It is a pop music",
        backgroundImage: "https://cdna.artstation.com/p/assets/images/images/029/031/880/large/universegfx-juice-wrld-album-cover-behance-version.jpg?1596238538",

        

        creationTime: new Date(0),
        lastModified: new Date(2021, 11, 17),
    },

    //sorted by popularity
    versions: {
        sunnyDay1: {
            metaInfo: {
                authorId: 'helena',
                contributionMessage: "Draft version (very first)",
                parentVersionId: null,
                duration: 100,

                votes: 5,
                creationTime: new Date(0),
                lastModified: new Date(1),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'guitar',
                    duration: 48,
                },
            ],
            
            comments: {
                comment1: {
                    authorId: 'bob',
                    commentMessage: "This is amazing!",
                    parentCommentId: null,
                    votes: 0,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(1),
                },
                comment2: {
                    authorId: 'bob',
                    commentMessage: "This is Yes!",
                    parentCommentId: null,
                    votes: 4,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(1),
                },
                comment3: {
                    authorId: 'bob',
                    commentMessage: "Wooow amazing!",
                    parentCommentId: null,
                    votes: 1,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(1),
                },
                comment4: {
                    authorId: 'bob',
                    commentMessage: "Wooow amazing!",
                    parentCommentId: "comment1",
                    votes: 1,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(1),
                },
                comment5: {
                    authorId: 'bob',
                    commentMessage: "Wooow amazing!",
                    parentCommentId: "comment1",
                    votes: 0,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(1),
                }
            }
        },

        
        sunnyDay2: {
            metaInfo: {
                authorId: 'bob',
                contributionMessage: "See this, it is cool!",
                parentVersionId: 'sunnyDay1',
                duration: 100,


                votes: 6,
                creationTime: new Date(2021, 5, 20),
                lastModified: new Date(2021, 5, 17),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'vocal',
                },
            ],
            
            comments: {
            }
        },
        sunnyDay3: {
            metaInfo: {
                authorId: 'michael',
                contributionMessage: "See this, it is cool!",
                parentVersionId: 'sunnyDay1',
                duration: 100,

                votes: 7,
                creationTime: new Date(2021, 6, 17),
                lastModified: new Date(2021, 6, 17),
            },
            tracks: [
                 {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'piano',
                },
            ],
            
            comments: {
            }
        },
        sunnyDay4: {
            metaInfo: {
                authorId: 'dobby',
                contributionMessage: "See this, it is cool!",
                parentVersionId: 'sunnyDay1',
                duration: 100,

                votes: 6,
                creationTime: new Date(2021, 7, 20),
                lastModified: new Date(2021, 7, 27),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'guitar',
                },
            ],
            
            comments: {
            }

        },
        sunnyDay5: {
            metaInfo: {
                authorId: 'anna',
                contributionMessage: "See this, it is cool!",
                parentVersionId: 'sunnyDay2',
                duration: 100,

                votes: 6,
                creationTime: new Date(2021, 8, 20),
                lastModified: new Date(2021, 8, 27),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'piano',
                }
            ],
            
            comments: {
            }
        },
        sunnyDay6: {
            metaInfo: {
                authorId: 'herald',
                contributionMessage: "See this, it is cool!",
                parentVersionId: 'sunnyDay2',
                duration: 100,

                votes: 6,
                creationTime: new Date(2021, 8, 27),
                lastModified: new Date(2021, 8, 27),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'vocal',
                },
            ],
            
            comments: {
            }
        },
    },
}

const DUMMY_PROJECT_2 = {
    metaInfo: {
        ownerId: 'me',
        trackTitle: "Love",
        tags: [
            {label: "Guitar", value: "guitar"},
            {label: "Rock", value: "rock"},
            {label: "Hard", value: "hard"},
        ],
        description: "Hard Rock",
        creationTime: new Date(2021, 11, 10),
        lastModified: new Date(2021, 11, 10),
    },

    //sorted by popularity
    versions: {
        love1: {
            metaInfo: {
                authorId: 'me',
                contributionMessage: "Draft version (very first)",
                parentVersionId: null,
                duration: 10,

                votes: 0,
                creationTime: new Date(2021, 11, 10),
                lastModified: new Date(2021, 11, 11),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'guitar',
                    duration: 48,
                }
            ],
            
            comments: {
                comment2: {
                    authorId: 'helena',
                    commentMessage: "This is amazing!",
                    parentCommentId: null,
                    votes: 0,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(2021, 11, 11),
                }
            }
        },
        love2: {
            metaInfo: {
                authorId: 'helena',
                contributionMessage: "LOL!",
                parentVersionId: 'love1',
                duration: 120,

                votes: 0,
                creationTime: new Date(2021, 11, 15),
                lastModified: new Date(2021, 11, 15),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'drums',
                },
                
            ],
            
            comments: {
            }

        }
    },
}

const DUMMY_PROJECT_3 = {
    metaInfo: {
        ownerId: 'me',
        trackTitle: "Hate",
        tags: [
            {label: "Guitar", value: "guitar"},
            {label: "Rock", value: "rock"},
            {label: "Hard", value: "hard"},
        ],
        description: "Hard Rock",
        backgroundImage: "https://cdna.artstation.com/p/assets/images/images/029/031/880/large/universegfx-juice-wrld-album-cover-behance-version.jpg?1596238538",

        creationTime: new Date(2021, 11, 10),
        lastModified: new Date(2021, 11, 10),
    },

    //sorted by popularity
    versions: {
        hate1: {
            metaInfo: {
                authorId: 'me',
                contributionMessage: "Draft version (very first)",
                parentVersionId: null,
                duration: 10,

                votes: 5,
                creationTime: new Date(2021, 11, 10),
                lastModified: new Date(2021, 11, 11),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'guitar',
                }
            ],
            
            comments: {
                comment2: {
                    authorId: 'helena',
                    commentMessage: "This is amazing!",
                    parentCommentId: null,
                    votes: 6,
                    audioSegment: {start: 0, finish: 0},
                    creationTime: new Date(2021, 11, 11),
                }
            }
        },
        hate2: {
            metaInfo: {
                authorId: 'helena',
                contributionMessage: "LOL!",
                parentVersionId: 'hate1',
                duration: 120,

                votes: 0,
                creationTime: new Date(2021, 11, 15),
                lastModified: new Date(2021, 11, 15),
            },
            tracks: [
                {
                    url: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
                    type: 'guitar',
                    duration: 48,
                }
            ],
            
            comments: {
            }
        }
      }
    }

export const updateDatabase = (payload) => ({
    type: UPDATE_DATABASE,
    payload
})

export const createProfile = (payload) => ({
    type: CREATE_PROFILE,
    payload
})

export const setUser = (payload) => ({
    type: SET_USER,
    payload
})

export const addProfile = (payload) => ({
    type: ADD_PROFILE,
    payload
})

export const removeprofile = (payload) => ({
    type: REMOVE_PROFILE,
    payload
})

export const addProject = (payload) => ({
    type: ADD_PROJECT,
    payload
})

export const removeProject = (payload) => ({
    type: REMOVE_PROJECT,
    payload
})

export const addVersion = (payload) => ({
    type: ADD_VERSION,
    payload
})

export const removeVersion = (payload) => ({
    type: REMOVE_VERSION,
    payload
})

export const addComment = (payload) => ({
    type: ADD_COMMENT,
    payload
})

export const removeComment = (payload) => ({
    type: REMOVE_COMMENT,
    payload
})

export const changeVoteVersion = (payload) => ({
    type: CHANGE_VOTE_VERSION,
    payload
})

export const changeVoteComment = (payload) => ({
    type: CHANGE_VOTE_COMMENT,
    payload
})

function cleanUpProject(projects, profiles, projectId) {
    let newProjects = projects
    let newProfiles = profiles
    for (let versionId in projects[projectId].versions) {
        const result = cleanUpVersion(
            newProjects,
            newProfiles,
            projectId,
            versionId
        )
        newProjects = result.newProjects
        newProfiles = result.newProfiles
    }
    const ownerId = newProjects[projectId].metaInfo.ownerId

    delete newProjects[projectId]
    for (let i = 0; i < newProfiles[ownerId].projectIds.length; i++) {
        const pId = newProfiles[ownerId].projectIds[i]
        if (pId === projectId) {
            newProfiles[ownerId].projectIds = [
                ...newProfiles[ownerId].projectIds.slice(0, i),
                ...newProfiles[ownerId].projectIds.slice(i + 1)
            ]
            break
        }
    }

    newProfiles = recalcRating(newProjects, newProfiles, ownerId)
    return { newProjects, newProfiles }
}

function cleanUpVersion(projects, profiles, projectId, versionId) {
    let newProjects = projects
    let newProfiles = profiles
    for (let commentId in projects[projectId].versions[versionId].comments) {
        const result = cleanUpComment(
            newProjects,
            newProfiles,
            projectId,
            versionId,
            commentId
        )
        newProjects = result.newProjects
        newProfiles = result.newProfiles
    }
    const authorId = newProjects[projectId].versions[versionId].metaInfo.authorId

    delete newProjects[projectId].versions[versionId]
    for (let i = 0; i < newProfiles[authorId].versionIds.length; i++) {
        const vObj = newProfiles[authorId].versionIds[i]
        if (vObj.projectId === projectId && vObj.versionId === versionId) {
            newProfiles[authorId].versionIds = [
                ...newProfiles[authorId].versionIds.slice(0, i),
                ...newProfiles[authorId].versionIds.slice(i + 1)
            ]
            break
        }
    }

    newProfiles = recalcRating(newProjects, newProfiles, authorId)
    return { newProjects, newProfiles }
}

function cleanUpComment(projects, profiles, projectId, versionId, commentId) {
    let newProjects = projects
    let newProfiles = profiles
    const authorId =
        newProjects[projectId].versions[versionId].comments[commentId].authorId

    delete newProjects[projectId].versions[versionId].comments[commentId]
    for (let i = 0; i < newProfiles[authorId].commentIds.length; i++) {
        const cObj = newProfiles[authorId].commentIds[i]
        if (
            cObj.projectId === projectId &&
            cObj.versionId === versionId &&
            cObj.commentId === commentId
        ) {
            newProfiles[authorId].commentIds = [
                ...newProfiles[authorId].commentIds.slice(0, i),
                ...newProfiles[authorId].commentIds.slice(i + 1)
            ]
            break
        }
    }

    newProfiles = recalcRating(newProjects, newProfiles, authorId)
    return { newProjects, newProfiles }
}

function recalcRating(projects, profiles, profileId) {
    let rating = 0
    let maxVersion = 0
    for (let projectId of profiles[profileId].projectIds) {
        for (let versionId in projects[projectId].versions) {
            let cur = projects[projectId].versions[versionId].metaInfo.votes
            if (maxVersion < cur) {
                maxVersion = cur
            }
        }
    }
    rating += maxVersion * PROJECT_RATING
    for (let obj of profiles[profileId].versionIds) {
        const projectId = obj.projectId
        const versionId = obj.versionId
        let cur = projects[projectId].versions[versionId].metaInfo.votes
        if (cur < 0) {
            cur = 0
        }
        rating += cur * VERSION_RATING
    }
    for (let obj of profiles[profileId].commentIds) {
        const projectId = obj.projectId
        const versionId = obj.versionId
        const commentId = obj.commentId
        let cur = projects[projectId].versions[versionId].comments[commentId].votes
        if (cur < 0) {
            cur = 0
        }
        rating += cur * COMMENT_RATING
    }
    profiles[profileId].metaInfo.communityRating = rating
    return profiles
}

const initialState = {
    projects: {
        sunnyDay: DUMMY_PROJECT_1,
        love: DUMMY_PROJECT_2,
        hate: DUMMY_PROJECT_3,
    },
    profiles: {
        me: DUMMY_PROFILE_0,
        helena: DUMMY_PROFILE_1,
        bob: DUMMY_PROFILE_2,
        michael: DUMMY_PROFILE_3,
        dobby: DUMMY_PROFILE_4,
        anna: DUMMY_PROFILE_5,
        herald: DUMMY_PROFILE_6,
    },    
};


const database = (state = initialState, action) => {
    const safe = (opt1, opt2) => {
        if (opt1 === undefined)
            return opt2;
        return opt1;
    }

  switch (action.type) {
    case UPDATE_DATABASE: {
        const newDatabase = action.payload;
        return {
            ...state,
            ...newDatabase
        };
    }
    case CREATE_PROFILE: {
        const userId = action.payload.userId
        const name = action.payload.name
        const profileImage = action.payload.profileImage
        if (state.profiles.hasOwnProperty(userId)) {
            return state;
        }
        return {
            ...state,
            profiles: {
                ...state.profiles,
                userId: {
                    metaInfo: {
                        name: name,
                        communityRating: 0,
                        profileImage: profileImage,
                    },
                    projectIds: [],
                    versionIds: [],
                    commentIds: []
                }
            }
        }
    }
    /*
        userId,
    */
    case SET_USER: {
        return {
            ...state,
            userId: action.payload.userId,
        }
    }

    /* payload format
        ownerId,
        trackTitle,
        tags,
        description,
        backgroundImage
    */
    case ADD_PROJECT: {
      const projectId = 'project' + randomString()
      const ownerId = action.payload.ownerId
      const versionId = 'version' + randomString()
      const authorId = ownerId

      const version = {
        metaInfo: {
          authorId: authorId,
          contributionMessage: safe(action.payload.contributionMessage, 'No message'),
          parentVersionId: safe(action.payload.parentVersionId, null),
          duration: safe(action.payload.duration, 230),

          votes: 0,
          creationTime: new Date(),
          lastModified: new Date()
        },
        tracks: safe(action.payload.tracks, [{url: null, type: null, duration: 0}]),
        comments: {}
      }

      const project = {
        metaInfo: {
            ownerId: ownerId,
            trackTitle: safe(action.payload.trackTitle, 'No title'),
            tags: safe(action.payload.tags, []),
            description: safe(action.payload.description, 'No description'),
            backgroundImage: safe(action.payload.backgroundImage, null),

            creationTime: new Date(),
            lastModified: new Date()
        },
        versions: {
          [versionId]: version
        }
      }
      console.log(project);

      let newProjects = { ...state.projects }
      newProjects[projectId] = project

      let newProfiles = { ...state.profiles }
      newProfiles[ownerId].projectIds.push(projectId)
      newProfiles[ownerId].versionIds.push({
        projectId,
        versionId
      })
      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }
    }

    /* payload format
        projectId,
    */
    case REMOVE_PROJECT: {
      const projectId = action.payload.projectId
      const { newProjects, newProfiles } = cleanUpProject(
        { ...state.projects },
        { ...state.profiles },
        projectId
      )
      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }
    }

    /* payload format
      projectId,
      authorId,
      contributionMessage,
      parentVersionId,
      duration,
      tracks {url: '', type: ??, duration: 0},
    */
    case ADD_VERSION: {
      const projectId = action.payload.projectId;
      const versionId = 'version' + randomString();
      const authorId = action.payload.authorId;
      const version = {
        metaInfo: {
          authorId: action.payload.authorId,
          contributionMessage: safe(action.payload.contributionMessage, 'No message'),
          parentVersionId: safe(action.payload.parentVersionId, null),
          duration: safe(action.payload.duration, 0),

          votes: 0,
          creationTime: new Date(),
          lastModified: new Date()
        },
        tracks: action.payload.tracks,
        comments: {}
      };

      let newProjects = { ...state.projects };
      newProjects[projectId].versions[versionId] = version;
      newProjects[projectId].metaInfo.lastModified = new Date(version.metaInfo.creationTime.getTime());

      let newProfiles = { ...state.profiles };
      newProfiles[authorId].versionIds.push({
        projectId,
        versionId
      });

      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }
    }

    /* payload format
        projectId,
        versionId,
    */
    case REMOVE_VERSION: {
      const projectId = action.payload.projectId
      const versionId = action.payload.versionId
      const { newProjects, newProfiles } = cleanUpVersion(
        { ...state.projects },
        { ...state.profiles },
        projectId,
        versionId
      )
      newProjects[projectId].metaInfo.lastModified = new Date();
      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }
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
        action.payload.audioSegment = { start: 0, finish: 0 }
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
        creationTime: new Date()
      };

      let newProjects = { ...state.projects };
      newProjects[projectId].versions[versionId].comments[commentId] = comment;
      newProjects[projectId].versions[versionId].metaInfo.lastModified = new Date(comment.creationTime.getTime());

      let newProfiles = { ...state.profiles };
      newProfiles[authorId].commentIds.push({
        projectId,
        versionId,
        commentId
      });

      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }
    }

    /* payload format
        projectId,
        versionId,
        commentId,
    */
    case REMOVE_COMMENT: {
      const projectId = action.payload.projectId
      const versionId = action.payload.versionId
      const commentId = action.payload.commentId
      const { newProjects, newProfiles } = cleanUpComment(
        { ...state.projects },
        { ...state.profiles },
        projectId,
        versionId,
        commentId
      )
      newProjects[projectId].versions[versionId].metaInfo.lastModified = new Date();
      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }
    }

    /* payload format
        projectId,
        versionId,
        votes,
    */
    case CHANGE_VOTE_VERSION: {
      const projectId = action.payload.projectId
      const versionId = action.payload.versionId

      let newProjects = { ...state.projects }

      newProjects[projectId].versions[versionId].metaInfo.votes +=
        action.payload.votes
      const authorId =
        newProjects[projectId].versions[versionId].metaInfo.authorId
      let newProfiles = recalcRating(
        newProjects,
        { ...state.profiles },
        authorId
      )

      const ownerId = newProjects[projectId].metaInfo.ownerId
      newProfiles = recalcRating(newProjects, { ...state.profiles }, ownerId)

      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }
    }


    /* payload format
        projectId,
        versionId,
        commentId,
        votes,
    */
    case CHANGE_VOTE_COMMENT: {
      const projectId = action.payload.projectId
      const versionId = action.payload.versionId
      const commentId = action.payload.commentId

      let newProjects = { ...state.projects }

      newProjects[projectId].versions[versionId].comments[commentId].votes +=
        action.payload.votes
      const authorId =
        newProjects[projectId].versions[versionId].comments[commentId].authorId
      const newProfiles = recalcRating(
        newProjects,
        { ...state.profiles },
        authorId
      )
      return {
        ...state,
        projects: newProjects,
        profiles: newProfiles
      }

    }
    default:
      return state
  }
}

export default database