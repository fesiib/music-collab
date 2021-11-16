import React from 'react';

const DEF_PROPS = {
    title: "Default",
    className: "",
    onClick: null,
}

function GenericButton(props) {
    props = {
        ...DEF_PROPS,
        ...props,
    }
    return (
        <button 
            className = {'rounded-md text-center text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600 ' + props.className}
            onClick = {props.onClick}
        >
            {props.title}
        </button>
    );
}

export default GenericButton;