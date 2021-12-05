import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GenericButton from "../../components/GenericButton";
import { loginUser } from "../../reducers/authentication";

const withLogin = (Page) => {
    return (props) => {
        const { userId } = useSelector((state) => state.authentication);
        const dispatch = useDispatch();

        const handleLogin = () => {
            dispatch(loginUser());
        };

        if (!userId) {
            return (
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="text-4xl text-gray-500">
                        Please log in to access this page.
                    </div>
                    <div>
                        <GenericButton onClick={handleLogin} title="Login" className="m-6 h-12 w-24 text-2xl items-center"/>
                    </div>
                </div>
            );
        }
        return <Page {...props} />;
    };
};

export default withLogin;
