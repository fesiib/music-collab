import { storage } from './firebase'; 
import randomString from './randomString';

const ROOT_PATH = 'gs://music-collab-9ec47.appspot.com/projects/';

export function uploadFile(file, callback) {
    const metadata = {
        contentType: file.type,
        fileName: randomString() + file.name,
    }

    storage.ref(`projects/${metadata.fileName}`).put(file).then((snapshot) => {
        const fileName = snapshot.metadata.name;
        console.log('uploaded ', fileName);
        if (typeof callback == 'function') {
            callback(fileName);
        }
    });
}

export function getFileURL(fileName, callback) {

    storage.ref(`projects/${fileName}`).getDownloadURL().then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url);
        if (typeof callback == 'function') {
            callback(url);
        }
    }).catch((error) => {
        console.log(error);
    });
}