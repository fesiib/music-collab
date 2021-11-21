import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import withHeader from "../../hocs/withHeader";
import InputField from "../../components/InputField";
import StolenSearchBar from "./StolenSearchBar";
import OneTrack from "../../components/OneTrack";
import GenericButton from "../../components/GenericButton";
import { getFileURL, uploadFile } from "../../services/storage";
import { addProject } from "../../reducers/database";
import { useHistory } from "react-router";
import GetDuration from "../../components/GetDuration";
import InstrumentSelector from "../../components/InstrumentSelector";


const CreateProject = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [trackNames, setTrackNames] = useState([]);
    const [instrument, setInstrument] = useState("guitar");
    const [isSubmitPressed, setIsSubmitPressed] = useState(false);
    const [trackLoading, setTrackLoading] = useState(false)


    // костыль чтобы апдейтить трек после аплоуда
    const [wavesurfUpdater, setWavesurfUpdater] = useState('')

    const { userId } = useSelector((state) => state.database);

    const fileInputRef = useRef();

    const addTrackToList = (newTrack) => {
        console.log("adding track to the list", newTrack);
        setTrackNames([...trackNames, { name: newTrack, type: instrument }]);
        setTrackLoading(false)

    };

    const handleFileUpload = (event) => {
        const file = fileInputRef.current.files[0];
        console.log({
            "uploaded file": file,
        });
        setTrackLoading(true)

        uploadFile(file, addTrackToList);
    };

    const updateTrackLink = (index, newLink, track) => {
        const trackNamesCopy = trackNames;
        trackNamesCopy[index] = {
            ...track,
            url: newLink,
        };
        setTrackNames(trackNamesCopy);
        setWavesurfUpdater(newLink)
    };

    const updateTrackDuration = (index, duration, track) => {
        console.log("updating track duration", index, duration, track);
        const trackNamesCopy = trackNames;
        trackNamesCopy[index] = {
            ...track,
            duration,
        };
        setTrackNames(trackNamesCopy);
    };

    useEffect(() => {
        trackNames.forEach((track, index) => {
            getFileURL(track.name, (url) => updateTrackLink(index, url, track));
        });
    }, [trackNames, updateTrackLink]);

    const handleCreateProject = () => {
        if (!description || !name || !trackNames.length) {
            setIsSubmitPressed(true)
            return
        }
        dispatch(
            addProject({
                ownerId: userId,
                tracks: trackNames,
                trackTitle: name,
                description,
                tags,
            })
        );
        history.push("/");
    };

    console.log({
        ownerId: userId,
        tracks: trackNames,
        trackTitle: name,
        description,
        tags,
        duration: trackNames[0]?.duration,
    });
    return (
        <div
            className="w-full flex flex-col items-center p-6"
            data-cy="container"
        >
            <div
                data-cy="content"
                className="w-4/5 h-full rounded-xl bg-white shadow-lg flex flex-col items-center p-4 pt-8"
            >
                <h1> Create Project</h1>
                <div
                    data-cy="forms-container"
                    className="w-1/2 flex flex-col items-start"
                >
                    <InputField
                        value={name}
                        setValue={setName}
                        placeholder="Project name"
                        isRequired
                        isSubmitPressed={isSubmitPressed}
                        fillOutText="Please fill out the project name"
                    />
                    <h3> Tag List </h3>
                    <StolenSearchBar
                        placeholder="Search for Music, Authors, and Tags."
                        value={tags}
                        setValue={setTags}
                        isRequired
                        fillOutText="Please select at least one tag"
                        isSubmitPressed={isSubmitPressed}

                    />
                    <InputField
                        value={description}
                        setValue={setDescription}
                        placeholder="Project Description"
                        isTextArea                       
                        isSubmitPressed = {isSubmitPressed} 
                        isRequired
                        fillOutText="Please fill out the project description"
                    />
                    <div
                        data-cy="tracks-container"
                        className="w-full flex flex-col rounded-2xl mx-auto bg-gray-300 p-3 gap-3 my-5"
                    >
                        {trackNames.map((track, index) => {
                            console.log(
                                "inside map function, track link",
                                track
                            );

                            return (
                                <>
                                    {track.url && (
                                        <>
                                            <OneTrack audioUrl={track.url} updaterState={wavesurfUpdater} type={track.type}  />
                                            <GetDuration
                                                audioSrc={track.url}
                                                setDuration={(duration) =>
                                                    updateTrackDuration(
                                                        index,
                                                        duration,
                                                        track
                                                    )
                                                }
                                            />
                                        </>
                                    )}
                                </>
                            );
                        })}
                        {trackLoading && <div>Loading...</div>}        
                        <div
                            data-cy="buttonsContainer"
                            hidden={trackNames.length > 0}
                        >
                           <InstrumentSelector instrument={instrument}  setInstrument={setInstrument} />
                            
                            <GenericButton
                                title={"Add track"}
                                className="w-max"
                                onClick={() => fileInputRef.current.click()}
                            />
                            <input
                                onChange={handleFileUpload}
                                multiple={false}
                                ref={fileInputRef}
                                type="file"
                                accept=".mp3,"
                                hidden
                            />
                        </div>
                    </div>
                    <GenericButton
                        title={"Create Project"}
                        className="w-max self-end"
                        onClick={handleCreateProject}
                    />
                </div>
            </div>
        </div>
    );
};

export default withHeader(CreateProject);
