import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_firebaseKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    //measurementId: process.env.REACT_APP_measurementId,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.database();

const firestore = firebaseApp.firestore();

const analytics = firebaseApp.analytics();

const storage = firebaseApp.storage();

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);    
    return res.user
  } catch (error) {
    return null
  }  
}
export const logOut = () => {
  auth.signOut().then(()=> {
    console.log('logged out')
  }).catch((error) => {
    console.log(error.message)
  })
}

export {database, firestore, storage, auth, analytics, firebaseApp, firebase as default};