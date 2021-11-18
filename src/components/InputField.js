import React from "react";

const InputField = ({ value, setValue, placeholder, isTextArea }) => {
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            ) : (
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
        </div>
    );
};

export default InputField;
