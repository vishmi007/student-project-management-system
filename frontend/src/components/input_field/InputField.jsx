import React from "react";
import "./InputField.css";

export default function InputField({
  label,
  placeholder,
  isRequired,
  getInputValue,
  value,
  type,
  name,
}) {
  return (
    <div className='input-container'>
      <label className='input-label mb-2'>
        {label}{" "}
        {isRequired ? <span className='input-field-required'>*</span> : ""}
      </label>
      <input
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={getInputValue}
        className='rounded-input'
        required={isRequired}
      />
    </div>
  );
}
