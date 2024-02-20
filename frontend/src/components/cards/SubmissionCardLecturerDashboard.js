import React from "react";
import "./SubmissionCardLecturerDashboard.css"; 
export default function SubmissionCardLecturerDashboard(props) {
  return (
    <div className="lecturer-submissionCard">
      <div className="lecturer-submissionInfo">
       <div className="lecturer-submissionValue">{props.groupName}</div>
        <div className="lecturer-submissionValue">{props.formattedDate}</div>
        <div className="lecturer-submissionValue">{props.evaluatorIncharge}</div>
        <div className="lecturer-submissionValue">{props.supervisorInCharge}</div>

      </div>
    </div>
  );
}
