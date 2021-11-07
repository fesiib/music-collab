import React from 'react';

const default_props = {
    placeholder: "Search",

};

function SearchBar(props) {
    props = {
        ...default_props,
        ...props,
    }


    return (
        <div className="border">
            Search Bar: {props.placeholder}
        </div>
    );
}

export default SearchBar;