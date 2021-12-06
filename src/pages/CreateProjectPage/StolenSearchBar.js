import React from 'react'
import { useSelector } from 'react-redux'

import CreatableSelect from 'react-select/creatable'



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

function StolenSearchBar({
  placeholder,
  fillOutText,
  isSubmitPressed,
  isRequired,
  setValue,
  value
}) {

  const shouldHighlight = isSubmitPressed && isRequired && value?.length === 0;

  let requiredStyling = shouldHighlight ? "rounded-lg border-2 border-red-400" : '';

  const { data } = useSelector(state => state.tagsData);

  const options = Object.keys(data).map((val) => {
    return {
        value: val, 
        label: data[val],
    };
  });

  console.log(options);
  return (
    <div className="w-full">
      <CreatableSelect
        className={`${requiredStyling}`}
        isMulti
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        value={value}
        onChange={setValue}
      />
     {shouldHighlight && <p className="text-red-500">{fillOutText}</p>}
    </div>
  )
}

StolenSearchBar.defaultProps = {
  placeholder: 'Search',
  fillOutText: '', 
  isSubmitPressed: false,
  isRequired: false,
}

export default StolenSearchBar
