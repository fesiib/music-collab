import React from 'react';

import CreatableSelect from 'react-select/creatable';
import GENRE_OPTIONS from '../data/genreOptions';

const DEF_PROPS = {
    placeholder: "Search",
};

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20,
    }),
    option: (styles) => {
        return {
          ...styles,
          backgroundColor: 'white',
          ':hover': {
                backgroundColor: '#4f46e5',
                color: 'white',
            },
        };
    },
    multiValue: (styles) => {
        return {
          ...styles,
          backgroundColor: 'white',
          borderWidth: '1px',
          borderColor: 'black'
        };
    },
    multiValueLabel: (styles) => {
        return {
            ...styles,
            color: 'black'
        }
    },
    multiValueRemove: (styles) => {
        return {
            ...styles,
            color: 'grey',
            ':hover': {
                backgroundColor: '#4f46e5',
                color: 'white',
            },
        };
    },
  }

function SearchBar(props) {
    props = {
        ...DEF_PROPS,
        ...props,
    }

    return (
        <CreatableSelect
            isMulti
            options={GENRE_OPTIONS}
            placeholder={props.placeholder}
            styles={customStyles}
        />
    );
}

export default SearchBar;