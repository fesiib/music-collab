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
                backgroundColor: "rgba(99, 102, 241, 1)",
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
            color: 'white',
            backgroundColor: "rgba(99, 102, 241, 1)",
            ':hover': {
                backgroundColor: "rgba(79, 70, 229, 1)",
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
        <div className='p-10'>
            <CreatableSelect
                isMulti
                options={GENRE_OPTIONS}
                placeholder={props.placeholder}
                styles={customStyles}
            />
        </div>
    );
}

export default SearchBar;