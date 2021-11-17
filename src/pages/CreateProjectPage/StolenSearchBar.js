import React from 'react'

import CreatableSelect from 'react-select/creatable'
import GENRE_OPTIONS from '../../data/genreOptions'

const DEF_PROPS = {
  placeholder: 'Search'
}

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor
  }),
  option: (styles) => {
    return {
      ...styles,
      backgroundColor: 'white',
      ':hover': {
        backgroundColor: 'rgba(99, 102, 241, 1)',
        color: 'white'
      }
    }
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'white',
      borderWidth: '1px',
      borderColor: 'black'
    }
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
      backgroundColor: 'rgba(99, 102, 241, 1)',
      ':hover': {
        backgroundColor: 'rgba(79, 70, 229, 1)'
      }
    }
  }
}

function StolenSearchBar(props) {
  props = {
    ...DEF_PROPS,
    ...props
  }

  return (
    <div className="w-full">
      <CreatableSelect
        isMulti
        options={GENRE_OPTIONS}
        placeholder={props.placeholder}
        styles={customStyles}
        value={props.value}
        onChange={(value) => props.setValue(value)}
      />
    </div>
  )
}

export default StolenSearchBar
