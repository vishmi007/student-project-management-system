import React from "react";
import "./Dropdown.css";
import { useState } from "react";

export default function Dropdown({ options, getValue: getSelection , displayText}) {
  const [selectedOption, setSelectedOption] = useState(options[0]); // Set the initial selected option to the first one in the array

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    getSelection(event.target.value);
  };

  return (
    <div className='d-flex flex-column'>
      <label className='mb-2' htmlFor='dropdown mb-2'>
        {displayText}
      </label>
      <select
        className='dropdown-select'
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
