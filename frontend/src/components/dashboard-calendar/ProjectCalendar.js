import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay, startOfDay, endOfDay } from "date-fns";
import "./ProjectCalendar.css";

function ProjectCalendar({ projects, selectedProject }) {
  const customTileClassName = ({ date }) => {
    if (!selectedProject) {
      return ""; // No highlighting if no project is selected
    }

    const currentDate = startOfDay(date);
    const projectStartDate = startOfDay(new Date(selectedProject.startDate));
    const projectEndDate = endOfDay(new Date(selectedProject.deadline));

    if (isSameDay(currentDate, projectStartDate)) {
      return "highlighted-start-date"; 
    } else if (isSameDay(currentDate, projectEndDate)) {
      return "highlighted-end-date"; 
    } else if (currentDate > projectStartDate && currentDate < projectEndDate) {
      return "highlighted-middle-date"; 
    }

    return "";
  };

  return (
    <div style={{ width: "100%" }}>
      <h3>Project Dates</h3>
      <Calendar
        tileClassName={customTileClassName}
        calendarType="gregory"
        locale="en-US"
        className="custom-calendar"
        value={
          selectedProject
            ? [new Date(selectedProject.startDate), new Date(selectedProject.deadline)]
            : new Date()
        }
      />
    </div>
  );
}

export default ProjectCalendar;
