import React from 'react';

const DEF_PROPS = {
    title: "Default",
    className: "",
}

function GenericButton(props) {
    props = {
        ...DEF_PROPS,
        ...props,
    }
    return (
        <div className = {'rounded-md text-center text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600 ' + props.className}>
            {props.title}
        </div>
    );
}

export default GenericButton;