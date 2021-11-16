import React, { useRef } from 'react';
import { uploadFile } from '../services/storage';

function UploadAudio(props) {

    const fileInputRef = useRef();

    const handleChange = (event) => {
        const file = fileInputRef.current.files[0];
        uploadFile(file);
    }

    return (
        <>
            <button className='bg-black' onClick={()=>fileInputRef.current.click()} > Upload </button>
            <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' accept=".mp3," hidden/>
        </>
    );
}

export default UploadAudio;