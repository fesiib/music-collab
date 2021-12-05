import { firebaseApp, database } from "./firebase";

export async function fetchDatabase(callback) {
    console.log("here");
    const rootRef = database.ref();
    const projectsRef = database.ref('/database/projects');
    const profilesRef = database.ref('/database/profiles');
    console.log(rootRef);
    
    rootRef.get().then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })

    projectsRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data === null) {
            return;
        }
    });
    projectsRef.on('child_changed', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data === null) {
            return;
        }
    })

    profilesRef.on('child_added', (snapshot) => {
        console.log(snapshot);
        const data = snapshot.val();
        console.log(data)
        if (data === null) {
            return;
        }
    });
    profilesRef.on('child_changed', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data === null) {
            return;
        }
    })
}

export async function addProject() {
    return;
}

export async function addVersion() {
    return;
}

export async function addComment() {
    return;
}

export async function addProfile() {
    return;
}

export async function changeVoteVersion() {
    return;
}

export async function changeVoteComment() {
    return;
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