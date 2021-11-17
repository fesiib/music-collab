import { v4 as randomStringGenerator } from 'uuid';

function randomString() {
    const s = randomStringGenerator().replaceAll('-', '');
    return s;
}

export default randomString;