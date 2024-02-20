/*
 * FILE: StudentDashboard.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains student dashboard page
 * REFERENCE: None
 * LAST MOD: 08/10/2023
 */
import React, { useContext, useState } from "react";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import { StudentSectionHeader } from "../../../components/student_section_header/StudentSectionHeader";
import Timer from "../../../components/timer/Timer";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";

import { faClock } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//TODO:this is removed recheck
// import Kanban from "../../../components/kanban/Kanban";
import KanbanBoard from "../../../components/KanbanBoard/Kanban";
import { EnrollmentErrorContext } from "../../../context/student_dashboard_contexts/EnrollmentErrorContext";
import { SelectedProjectContext } from "../../../context/student_dashboard_contexts/SelectedProjectContext";

export default function StudentDashboard() {
  //VARIABLES AND CONSTANTS
  const navigate = useNavigate();
  //CONTEXT CALLS
  const { name } = useContext(EnrollmentErrorContext);
  const { projectList } = useContext(EnrollmentErrorContext);
  //STATES AND EFFECTS
  const[clickTimer , setClickTimer] =  useState(false);
  const [selectedProject , setSelectedProject] = useState(projectList[0]);
  console.log("This is the initial val of selected project"+selectedProject);
  console.log(selectedProject);


  function handleJoinProject() {
    navigate("./enrollment");
  }

  function handleSetTimer(){
    setClickTimer(prev => !prev);
  }

 

  // const StudentName = "Vansitha"; //Hardcoded for now change later
  return (
    <div>
      <NotificationHeader />
      <SelectedProjectContext.Provider value={{selectedProject,setSelectedProject}}>
      <div>
        <StudentSectionHeader
          greeting="Welcome"
          name={name}
          desc="Displays a list of your currently ongoing projects"
          joinProject={handleJoinProject}
        />
      </div>
      <div>
        {projectList.length !== 0 ?(
           <KanbanBoard fetchendpoint="/student/get-kanban"/> 
        ):(
          <h6>No any projects</h6>
        )}
        
        
      </div>

      {/* <h4>{selectedProject.projectName}</h4> */}

      </SelectedProjectContext.Provider>

    

      <div className="timer-container">
      <FontAwesomeIcon icon={faClock} size="2xl" onClick={handleSetTimer}/>
     
        
      </div>

      {clickTimer?(
        <div className="popup-overlay">
            
        <div className="popup-content">
        <button onClick={handleSetTimer}>clickme</button>
        
          <Timer />
          
          
        </div>
      </div>
      ):
      (
        <div></div>
      )}




      <div>{/* <DashboardCalendar /> */}</div>
    </div>
  );
}
