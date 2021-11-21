import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import OneTrack from "../../components/OneTrack";
import GetDuration from "../../components/GetDuration";
import { uploadFile, getFileURL } from "../../services/storage";
import GenericButton from "../../components/GenericButton";
import { addVersion } from "../../reducers/database";
import { useHistory } from "react-router";

const INSTRUMENTS = ["Piano", "Guitar", "Bass", "Drums"];

const Contribute = ({ project, version, projectId, versionId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [description, setDescription] = useState("");
    const [trackNames, setTrackNames] = useState([]);
    const [instrument, setInstrument] = useState("guitar");
    const [trackLoading, setTrackLoading] = useState(false)
    const fileInputRef = useRef();
    const { userId } = useSelector((state) => state.database);

    console.log("contribute inner page", project);

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
        dispatch(
            addVersion({
                projectId,
                authorId: userId,
                contributionMessage: description,
                parentVersionId: versionId,
                duration: trackNames[0]?.duration || 220,
                tracks: [...version?.tracks, ...trackNames],
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
                    />
                    <h3 className="self-start"> Tracks </h3>
                    <TracksContainer>
                        {version?.tracks?.map((track) => (
                            <>
                                {" "}
                                {track.url && (
                                    <OneTrack audioUrl={track.url} />
                                )}{" "}
                            </>
                        ))}
                    </TracksContainer>
                    <h3 className="self-start"> Your Added track </h3>
                    <TracksContainer>
                        {trackNames.map((track, index) => {
                            console.log(
                                "inside map function, track link",
                                track
                            );

                            return (
                                <>                                    
                                    {track.url && (
                                        <>
                                            <OneTrack audioUrl={track.url} />
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
                            daa-cy="buttonsContainer"
                            hidden={trackNames.length > 0}
                        >
                            <select
                                value={instrument}
                                onChange={(e) => {
                                    console.log("value", e.target.value);
                                    setInstrument(e.target.value);
                                }}
                                className="w-20 rounded-md text-center text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600 mr-4"
                            >
                                {INSTRUMENTS.map((curInstrument) => (
                                    <option value={curInstrument}>
                                        {" "}
                                        {curInstrument}
                                    </option>
                                ))}
                            </select>
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
                    </TracksContainer>
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

const TracksContainer = ({ children }) => {
    return (
        <div
            data-cy="tracks-container"
            className="w-full flex flex-col rounded-2xl mx-auto bg-gray-300 p-3 gap-3 my-3"
        >
            {children}
        </div>
    );
};
export default Contribute;
