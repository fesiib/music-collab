import React from "react";

const INSTRUMENTS = [
    { label: "Piano", value: "piano" },
    { label: "Guitar", value: "guitar" },
    { label: "Bass", value: "bass" },
    { label: "Drums", value: "drums" },
    { label: "Vocal", value: "vocal" },
];

const InstrumentSelector = ({ instrument, setInstrument }) => {
    return (
        <select
            value={instrument}
            onChange={(e) => {
                console.log("value", e.target.value.toLowerCase());                
                setInstrument(e.target.value.toLowerCase());
            }}
            className="w-20 rounded-md text-center text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600 mr-4"
        >
            {INSTRUMENTS.map((curInstrument) => (
                <option value={curInstrument.value}>
                    {curInstrument.label}
                </option>
            ))}
        </select>
    );
};

export default InstrumentSelector;
