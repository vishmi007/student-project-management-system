/*
 * FILE: StudentSectionHeader.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains Section Header for student dashboard page
 * REFERENCE: None
 * LAST MOD: 07/08/2023
 */
import React, { useContext , useEffect, useState } from "react";
import Button from "../btns/Button";
import "./StudentSectionHeader.css";
import DropDown from "../dropdown/Dropdown";
import { EnrollmentErrorContext } from "../../context/student_dashboard_contexts/EnrollmentErrorContext";
import { SelectedProjectContext } from "../../context/student_dashboard_contexts/SelectedProjectContext";




export function StudentSectionHeader({
  greeting,
  name,
  desc,
  selectProject,
  joinProject,
}) {

  // CONSTANTS
  const {projectList} =  useContext(EnrollmentErrorContext);
  const {selectedProject} =  useContext(SelectedProjectContext);
  const {setSelectedProject} =  useContext(SelectedProjectContext);

  //STATES AND EFFECTS
  const [projectNameList , setProjectNameList] = useState([]);
  // const [selectedProject , setSelectedProject] = useState("");

  useEffect(()=>{
    const temArray = [];
    for(const project of projectList){
      temArray.push(project.projectName);
    }   

    setProjectNameList(temArray);

  },[])
  //FUNTIONS
  //API 


  //iterate the entire array and get he list of project names



  const getSelected = (val) => {

    console.log(val);

    for(const project of projectList){

      if(project.projectName === val){
        setSelectedProject(project);
      }
    }

    console.log("Printing from the set selected ");

    console.log(selectedProject);

  };




  return (
    <div>
      <section className="pt-3 d-flex justify-content-between">
        <div>
          <h1>
            {greeting} {name}
          </h1>
          <p>{desc}</p>
        </div>
        <div className="button-container">
          <div className="m-2">
            {/* <Button color={"red"} labelText={"Select Project"}></Button> */}
            <DropDown
              options={projectNameList}
              getValue={getSelected}
              displayText={"Select a team"}
            />
          </div>
          <div className="m-2">
            <Button
              color={"red"}
              labelText={"Join Project"}
              onClickHandler={joinProject}
            ></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
