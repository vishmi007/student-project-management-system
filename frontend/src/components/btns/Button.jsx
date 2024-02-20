/*
 * FILE: Button.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Resuable button component
 * REFERENCE: None
 * LAST MOD: 03/08/2023
 */

import React from "react";
import "./Button.css";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Button({
  onClickHandler,
  labelText,
  color,
  size,
  isLoading,
  type,
}) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`btn ${color} ${size}`}
      onClick={onClickHandler}
    >
      {isLoading ? <Spinner size='sm' /> : labelText}
    </button>
  );
}
