import React from "react";

const InputField = ({ value, setValue, placeholder, isTextArea, fillOutText, isSubmitPressed, isRequired }) => {
    const shouldHighlight = isSubmitPressed && isRequired && !value;

    let requiredStyling = shouldHighlight ? "border-2 border-red-400 rounded" : ''
    console.log(placeholder, shouldHighlight)
        

    return (
        <div className="w-full my-2">
            <h3> {placeholder} </h3>
            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    cols="30"
                    rows="5"
                    placeholder={placeholder}
                    required={isRequired}
                    className={`shadow rounde appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${requiredStyling}`}
                />
            ) : (
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${requiredStyling}`}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    required={isRequired}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
            {shouldHighlight && <p className="text-red-500">{fillOutText}</p>}
        </div>
    );
};

export default InputField;
