import React, {useState} from 'react'


const DownVote = ( {class_use} )=> {
    var default_class = "h-7 w-7 fill-current ";
    var class_use;

    if (class_use == undefined ) {
        class_use = default_class;
    }

    return (
        <svg class={class_use} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
            <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/>
        </svg>
    )

}

export default DownVote;