import React from "react";
import "./DataSummary.css";

export default function DataSummary({ heading, value }) {
  return (
    <div className="data-container-summary">
      <div className="heading">{heading}</div>
      <div className="value">{value}</div>
    </div>
  );
}
