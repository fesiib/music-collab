import { storage } from './firebase'; 
import randomString from './randomString';

const ROOT_PATH = ''

export function uploadFile(file, callback) {
    const metadata = {
        contentType: file.type,
        fileName: randomString() + file.name,
    }

    storage.ref(`projects/${metadata.fileName}`).put(file).then((snapshot) => {
        const fileName = snapshot.metadata.name;
        console.log('uploaded ', getFileURL(fileName));
        if (typeof callback == 'function') {
            callback();
        }
    });
}

export function getFileURL(filePath) {
    return ROOT_PATH + filePath;
}