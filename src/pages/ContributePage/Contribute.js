import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import InputField from "../../components/InputField";
import OneTrack from "../../components/OneTrack";
import GetDuration from "../../components/GetDuration";
import { uploadFile, getFileURL } from "../../services/storage";
import GenericButton from "../../components/GenericButton";
import { addVersion } from "../../services/firebase_database";
import InstrumentSelector from "../../components/InstrumentSelector";
import Loading from "../../components/Loading";
import { getAllTracks } from "../../hocs/withHeader/MusicPlayer";

const Contribute = ({ project, version, projectId, versionId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [description, setDescription] = useState("");
    const [trackNames, setTrackNames] = useState([]);
    const [instrument, setInstrument] = useState("guitar");
    const [trackLoading, setTrackLoading] = useState(false);
    // костыль чтобы апдейтить трек после аплоуда
    const [wavesurfUpdater, setWavesurfUpdater] = useState("");
    const [isSubmitPressed, setIsSubmitPressed] = useState(false);

    const fileInputRef = useRef();
    const { userId } = useSelector((state) => state.authentication);

    const allTracks = getAllTracks(project, versionId);

    console.log(allTracks, project, versionId);

    console.log("contribute inner page", project);

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

    const handleCreateVersion = () => {
        if (!description || !trackNames.length) {
            setIsSubmitPressed(true);
            return;
        }
        let maxDuration = 0;
        trackNames.forEach((track) => {
            maxDuration = Math.max(maxDuration, track.duration);
        });
        dispatch(
            addVersion({
                projectId,
                authorId: userId,
                contributionMessage: description,
                parentVersionId: versionId,
                duration: maxDuration || 220,
                tracks: [...trackNames],
            })
        );
        history.push(`/project/${projectId}`);
    };

    useEffect(() => {
        trackNames.forEach((track, index) => {
            getFileURL(track.name, (url) => updateTrackLink(index, url, track));
        });
    }, [trackNames, updateTrackLink]);

    console.log({
        projectId,
        authorId: userId,
        contributionMessage: description,
        parentVersionId: versionId,
        duration: trackNames[0]?.duration || 220,
        tracks: trackNames,
    });

    const shouldHighlightTracks = !trackNames.length && isSubmitPressed;

    return (
        <div
            className="w-full flex flex-col items-center p-6"
            data-cy="container"
        >
            <div
                data-cy="content"
                className="w-4/5 h-full rounded-xl bg-white shadow-lg flex flex-col items-center p-4 pt-8"
            >
                <div
                    data-cy="forms-container"
                    className="w-1/2 flex flex-col items-center"
                >
                    <h1> Upload your contribution to </h1>
                    <h1 className="text-blue-400">
                        {project?.metaInfo?.trackTitle}
                    </h1>
                    <InputField
                        value={description}
                        setValue={setDescription}
                        placeholder="Contribution message"
                        isTextArea
                        isRequired
                        isSubmitPressed={isSubmitPressed}
                        fillOutText="Please fill out the contribution message"
                    />
                    <h3 className="self-start"> Tracks </h3>
                    <TracksContainer>
                        {allTracks.map((track) => (
                            <>
                                {" "}
                                {track.url && (
                                    <OneTrack
                                        audioUrl={track.url}
                                        updaterState={wavesurfUpdater}
                                        type={track.type}
                                    />
                                )}{" "}
                            </>
                        ))}
                    </TracksContainer>
                    <h3 className="self-start"> Your Added track </h3>
                    <TracksContainer
                        shouldHighlightTracks={shouldHighlightTracks}
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
                            dat
                            a-cy="buttonsContainer"
                            hidden={trackNames.length > 0}
                        >
                            <InstrumentSelector
                                instrument={instrument}
                                setInstrument={setInstrument}
                            />
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
                    </TracksContainer>
                    {shouldHighlightTracks && (
                        <p className="text-red-500">
                            {" "}
                            Please upload your contribution
                        </p>
                    )}
                    <GenericButton
                        title={"Upload"}
                        className="w-max self-end"
                        onClick={handleCreateVersion}
                    />
                </div>
            </div>
        </div>
    );
};

const TracksContainer = ({ children, shouldHighlightTracks }) => {
    return (
        <div
            data-cy="tracks-container"
            className={`w-full flex flex-col rounded-2xl mx-auto bg-gray-100 p-3 gap-3 my-3 ${
                shouldHighlightTracks && "border-2 border-red-400"
            }`}
        >
            {children}
        </div>
    );
};
export default Contribute;
