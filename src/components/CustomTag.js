import React from "react";

function CustomTag(props) {
    return (
        <div className="flex items-center rounded-sm bg-pink-800 text-white mr-1 mb-1 p-2 max-w-30 max-h-12 ">            
            {props.label}
        </div>
    );
}

export default CustomTag;