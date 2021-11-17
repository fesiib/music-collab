import React, {useState} from 'react'

const UpDownVote = ( {class_use, up_down} )=> {
    var default_class = "h-7 w-7 fill-current ";
    var class_use;
    var transform = "";

    if (class_use === undefined ) {
        class_use = default_class;
    }
    if (up_down === "up") {
        transform = ""
    }
    if (up_down === "down") {
        transform = 'rotate(180)'
    }

    return (
        <svg class={class_use} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform= {transform} >
            <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
        </svg>
    )

}

export default UpDownVote;