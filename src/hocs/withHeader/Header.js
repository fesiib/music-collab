import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./logo.svg";
import MusicPlayer from "./MusicPlayer";
import logout from "./logout.svg";
import GenericButton from "../../components/GenericButton";

import { updateDatabase } from '../../reducers/database';
import { fetchDatabase } from '../../services/firebase_database';

import { loginUser, logoutUser } from "../../reducers/authentication";

const Header = () => {
    const { profiles } = useSelector((state) => state.database);
    const authentication = useSelector((state) => state.authentication);
    let userId, userName;

    userId = authentication.userId;
    userName = authentication.userName;

    const dispatch = useDispatch();

    const onLogin = () => {
        const loginThunk = loginUser();
        dispatch(loginThunk);
    };

    const onLogout = () => {
        dispatch(logoutUser());
    };
    useEffect(() => {
      fetchDatabase(dispatch);
    }, []);
    return (
        <div className="w-full h-28 flex flex-row items-center bg-white px-8 box-border ">
            <div className="flex flex-1 items-center justify-start">
                <Link
                    to="/"
                    className="flex flex-row items-center justify-start"
                >
                    <img src={"https://icon-library.com/images/analyze-_sound-_wave-music-512_362.png"} alt="logo" className="h-24 p-2"/>
                    {/* <div className="w-10 h-10 shadow-inner box-border rounded-full bg-red-600 mr-4" /> */}
                    <h1 className="flex-1 text-indigo-600"> MusicCollab </h1>
                </Link>
            </div>
            <MusicPlayer />

            <div className="flex flex-1 flex-row items-center justify-end">
                {!userId ? (
                    <GenericButton title={"Login"} onClick={onLogin} />
                ) : (
                    <>
                        <div className="flex flex-row items-center">
                            <div className="rounded-full h-12 w-12 overflow-hidden">
                                <img src={profiles[userId]?.metaInfo?.profileImage} className="object-cover h-12" />
                            </div>
                            <h1 className="pl-4 text-3xl"> {userName} </h1>
                        </div>
                        <div
                            data-cy="separator"
                            className="w-16 h-0 transform rotate-90 border-2 border-gray-20"
                        />
                        <img
                            onClick={onLogout}
                            src={logout}
                            alt="logout button"
                            className="cursor-pointer"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
