import React, { version } from "react";
import { useDispatch, useSelector } from "react-redux";
import PauseButton from "../icons/pause-button";
import PlayButton from "../icons/play-button";
import { pauseMusic, playMusic, setAudio } from "../reducers/player";

const DEF_PROPS = {
    className: "",
    versionId: "",
    projectId: "",
    onClick: () => (console.log("pressed")),
}

function PlayPauseButton(props) {
    const dispatch = useDispatch();

    props = {
        ...DEF_PROPS,
        ...props,
    };

    const { versionId, projectId, playing } = useSelector(state => state.player);

    const clickHandler = (event) => {
        event.stopPropagation();
        if (versionId !== props.versionId || projectId !== props.projectId) {
            dispatch(setAudio({
                versionId: props.versionId,
                projectId: props.projectId,
            }));
        }
        else {
            if (!playing) {
                dispatch(playMusic());    
            }
            else {
                dispatch(pauseMusic());
            }
        }
    };

    return (
        <div className={"bg-gray-100 rounded-full border-2 hover:bg-white" + props.className} onClick={clickHandler}>
            {
                (playing && versionId === props.versionId && projectId === props.projectId) ?
                        <div className="transform scale-150">
                            <PauseButton/>
                        </div>
                    : 
                        <div className="transform scale-150">
                            <PlayButton/>
                        </div>
            }
        </div>
    )
}

export default PlayPauseButton;