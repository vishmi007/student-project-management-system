import React from "react";
import "./CourseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export default function Courses(props) {
  return (
    <div className='courseList' onClick={props.clickHandler}>
      <div
        key={props.courseCode}
        className='courseCard'
        onClick={props.onClick}
      >
        <div className='courseCard_content'>
          <h3 className='courseName'>{props.courseName}</h3>
          <div className='courseCode'>{props.courseCode}</div>
          {/* //TODO:Need to do conditional rendering here */}
          <div className='teamNum'>{props.teamNum} Teams</div>
          <div className='CardIcon'>
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
      </div>
    </div>
  );
}
