import React from "react";
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
    console.log(authentication);
    console.log({ userId, userName });
    // const userName = profiles[userId].metaInfo.name;

    const onLogin = () => {
        const loginThunk = loginUser();
        dispatch(loginThunk);
    };

    const onLogout = () => {
        dispatch(logoutUser());
    };
    useEffect(() => {
      const callback = (profiles, projects) => {
        dispatch(updateDatabase({profiles, projects}));
      }
      fetchDatabase(callback);
    }, []);
    return (
        <div className="w-full h-28 flex flex-row items-center bg-white px-8 box-border ">
            <div className="flex flex-1 items-center justify-start">
                <Link
                    to="/"
                    className="flex flex-row items-center justify-start"
                >
                    {/* <img src={Logo} alt="logo" /> */}
                    <div className="w-10 h-10 shadow-inner box-border rounded-full bg-red-600 mr-4" />
                    <h1 className="flex-1"> SoundBeat </h1>
                </Link>
            </div>
            <MusicPlayer />

            <div className="flex flex-1 flex-row items-center justify-end">
                <h1> {userName} </h1>
                {!userId ? (
                    <GenericButton title={"Login"} onClick={onLogin} />
                ) : (
                    <>
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
