import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { setTags } from '../reducers/homepage/tabInfo';

const DEF_PROPS = {
    placeholder: "Search",
};

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        color: state.selectProps.menuColor,
        padding: 20,
        zIndex: 2,
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
    const dispatch = useDispatch();

    props = {
        ...DEF_PROPS,
        ...props,
    }

    const { searchTags } = useSelector(state => state.tabInfo);
    const { data } = useSelector(state => state.tagsData);

    const searchBarChangeHandler = (tags) => {
        dispatch(setTags({tags}));
    }

    return (
        <div className='p-10'>
            <Select
                isMulti
                options={data}
                value={searchTags}
                placeholder={props.placeholder}
                styles={customStyles}
                onChange={searchBarChangeHandler}
                noOptionsMessage={(() =>"Cannot find the tag...")}
            />
        </div>
    );
}

export default SearchBar;