import React, { useState } from "react";
import "./TextAreaInput.css";

export default function TextAreaInput({ label, placeholder,getInputValue, value, customStyle }) {
  return (
    <div>
      <div>
        <label className='mb-2'>{label}</label>
      </div>
      <textarea
        className='text-area-input'
        style={customStyle}
        rows='10'
        cols='120'
        value={value}
        onChange={getInputValue}
        placeholder={placeholder}
      />
    </div>
  );
}
