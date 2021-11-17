import React from "react";

function CustomTag(props) {
    return (
        <div className="rounded-sm bg-pink-800 text-white m-1 p-1">
            {props.title}
        </div>
    );
}

export default CustomTag;