/*
 * FILE: InputBox.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains a inputBox implementation
 * REFERENCE: None
 * LAST MOD: 07/08/2023
 */
import React from "react";
import "./Inputbox.css";
const InputBox = ({
  id,
  placeholder,
  handleInput,
  value,
  type,
}) => {


  return (
    <div className="col-xs-1 text-center">
      <input
        className="input-box"
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
      />
    </div>
  );
};
export default InputBox;
