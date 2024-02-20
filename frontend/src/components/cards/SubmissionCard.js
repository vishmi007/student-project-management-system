import React from "react";
import "./SubmissionCard.css"; 
export default function SubmissionCard(props) {
  return (
    <div className="submissionCard">
      <div className="submissionInfo">
       <div className="submissionValue">{props.groupName}</div>
        {/* <div className="submissionValue">{props.nameOfProject}</div> */}
        <div className="submissionValue">{props.formattedDate}</div>
        <div className="submissionValue">{props.evaluatorIncharge}</div>
      </div>
    </div>
  );
}
