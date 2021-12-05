import React from "react";

//const DEFAULT_BACKGROUND = 'https://www.rollingstone.com/wp-content/uploads/2018/09/beatles-white-album-.jpg';

function SingleCollaborator(props) {
    return (
        <div className="flex flex-col m-4">
            <div className="rounded-full h-24 w-24 overflow-hidden">
                <img src={props.profileImage} className="object-cover h-24" />
            </div>
            <p className="text-center"> {props.name} </p>
        </div>
    );
}

export default SingleCollaborator;