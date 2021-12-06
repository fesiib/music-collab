import React from "react";

function CustomTag(props) {
    return (
        <div className="flex items-center rounded-sm bg-pink-800 text-white m-1 p-2 max-w-28 max-h-12 ">            
            {props.label}
        </div>
    );
}

export default CustomTag;