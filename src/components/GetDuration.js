import React, { useRef } from "react";

const GetDuration = ({ audioSrc, setDuration }) => {
    const audioRef = useRef();

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            console.log(audioRef.current.duration);
            setDuration(audioRef.current.duration);
        }
    };

    return (
        <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata} hidden>
            <source src={audioSrc} type="audio/x-wav" />
        </audio>
    );
};

export default GetDuration;
