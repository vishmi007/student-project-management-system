import React from "react";
import "./ProjectCard.css"; 

export default function ProjectCard(props) {
  const { onClick, isSelected } = props;


  return (

    <div className={`projectCard ${isSelected ? "selected" : ""}`}role="project-card" onClick={onClick}>
      <div className="projectInfo">
        <div className="projectValue">{props.projectName}</div>
        <div className="projectValue">{props.moduleName}</div>
        <div className="projectValue">{props.lecturer}</div>
        <div className="projectValue">{props.deadline}</div>
        <div className="projectValue">
          {props.submissionType === "single" ? "Single Submission" : "Milestone Submission"}
        </div>
      </div>
    </div>
  );
}
