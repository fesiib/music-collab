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
import Loading from "../../components/Loading";
import { addNewTag } from "../../reducers/tagsData";
import withLogin from "../../hocs/withLogin";

const CreateProject = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [trackNames, setTrackNames] = useState([]);
    const [instrument, setInstrument] = useState("guitar");
    const [isSubmitPressed, setIsSubmitPressed] = useState(false);
    const [trackLoading, setTrackLoading] = useState(false);

    const [imageLink, setImageLink] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    // костыль чтобы апдейтить трек после аплоуда
    const [wavesurfUpdater, setWavesurfUpdater] = useState("");

    const { userId } = useSelector((state) => state.authentication);

    const fileInputRef = useRef();
    const imageUploadRef = useRef();

    const addTrackToList = (newTrack) => {
        console.log("adding track to the list", newTrack);
        setTrackNames([...trackNames, { name: newTrack, type: instrument }]);
        setTrackLoading(false);
    };

    const removeTrackFromList = () => {        
        setTrackNames([]);
    };

    const handleFileUpload = (event) => {
        const file = fileInputRef.current.files[0];
        console.log({
            "uploaded file": file,
        });
        setTrackLoading(true);
        if (file) {
            uploadFile(file, addTrackToList);
        }
    };

    const updateImageLink = (name) => {
        getFileURL(name, (url) => setImageLink(url));
        setImageLoading(false);
    };

    const handleImageUpload = (event) => {        
        const file = imageUploadRef.current.files[0];
        console.log({
            "uploaded file": file,
        });
        setImageLoading(true);
        uploadFile(file, updateImageLink);        
    };

    const updateTrackLink = (index, newLink, track) => {
        const trackNamesCopy = trackNames;
        trackNamesCopy[index] = {
            ...track,
            url: newLink,
        };
        setTrackNames(trackNamesCopy);
        setWavesurfUpdater(newLink);
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
        if (!description || !name || !trackNames.length || !imageLink) {
            setIsSubmitPressed(true);
            return;
        }
        dispatch(
            addProject({
                ownerId: userId,
                tracks: trackNames,
                trackTitle: name,
                description,
                tags,
                backgroundImage: imageLink,
            })
        );
        for (let tag of tags) {
            if (tag?.__isNew__) {
                console.log(tag);
                dispatch(
                    addNewTag({value: tag.value, label: tag.label})
                );
            }
        }
        history.push("/");
    };

    console.log({
        ownerId: userId,
        tracks: trackNames,
        trackTitle: name,
        description,
        tags,
        imageLink,
        duration: trackNames[0]?.duration,
    });

    const shouldHighlightTracks = !trackNames.length && isSubmitPressed;
    const shouldHighlightImage = !imageLink && isSubmitPressed;
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
                        isSubmitPressed={isSubmitPressed}
                        isRequired
                        fillOutText="Please fill out the project description"
                    />
                    <h3> Starting Track</h3>
                    <div
                        data-cy="tracks-container"
                        className={`w-full flex flex-col rounded-2xl mx-auto bg-gray-100 p-3 gap-3 my-5 ${
                            shouldHighlightTracks && "border-2 border-red-400"
                        }`}
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
                                            <OneTrack
                                                audioUrl={track.url}
                                                updaterState={wavesurfUpdater}
                                                type={track.type}
                                            />
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
                        {trackLoading && <Loading />}
                        <div
                            data-cy="buttonsContainer"
                            hidden={trackNames.length > 0}
                        >
                            <InstrumentSelector
                                instrument={instrument}
                                setInstrument={setInstrument}
                            />

                            <GenericButton
                                title={"Add track"}
                                className="w-max"
                                onClick={() => {
                                    if (fileInputRef.current)
                                        fileInputRef.current.click();
                                }}
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
                        <div
                            data-cy="buttonsContainer"
                            hidden={trackNames.length === 0}
                        >
                            <GenericButton
                                title={"Remove track"}
                                className="w-max"
                                onClick={removeTrackFromList}
                            />
                        </div>
                    </div>
                    {shouldHighlightTracks && (
                        <p className="text-red-500">
                            {" "}
                            Please upload your starting track
                        </p>
                    )}
                    <h3> Cover image </h3>
                    <div
                        data-cy="imageUpload"
                        className={`w-full flex flex-col rounded-2xl mx-auto bg-gray-100 p-3 gap-3 my-5 ${
                            shouldHighlightImage && "border-2 border-red-400"
                        }`}
                    >
                        <div className="w-full flex flex-row">
                            <div data-cy="imageUploadButton">
                                {!imageLink ? (
                                    <GenericButton                                    
                                    title={"Upload"}
                                    className="w-max"
                                    onClick={() => {
                                        if (imageUploadRef.current)
                                            imageUploadRef.current.click();
                                    }}
                                />

                                ) : (

                                    <GenericButton                                    
                                        title={"Delete"}
                                        className="w-max bg-red-500"
                                        onClick={() => {
                                            setImageLink('')
                                        }}
                                    />
                                    )
                                }
                                <input                                
                                    onChange={handleImageUpload}
                                    multiple={false}
                                    ref={imageUploadRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                />
                            </div>
                            {imageLoading && <div>Loading...</div>}
                            {imageLink && (
                                <img
                                    src={imageLink}
                                    alt="project cover"
                                    className="max-h-28 max-w-28 ml-5 rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                    {shouldHighlightImage && (
                        <p className="text-red-500">
                            {" "}
                            Please upload your cover image{" "}
                        </p>
                    )}
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

export default withHeader(withLogin(CreateProject));
