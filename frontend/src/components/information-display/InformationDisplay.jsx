import React from "react";
import "./InformationDisplay.css";
const InformationDisplay = ({ LecturerName, SupervisorName, UnitCode }) => {
  const lecturerName = LecturerName;
  const supervisorName = SupervisorName;
  const unitCode = UnitCode;

  return (
    <div className="information-display">
      <h2>Lecturer Incharge</h2>
      <p>{lecturerName}</p>
      <h2>Supervisor Incharge</h2>
      <p>{supervisorName}</p>
      <h2>Unit Code</h2>
      <p>{unitCode}</p>
    </div>
  );
};

export default InformationDisplay;
