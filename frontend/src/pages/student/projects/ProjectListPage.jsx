/*
 * FILE: Project List
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This view will show all the project related information overall
 * REFERENCE: None
 * LAST MOD: 15/08/2023
 */

import React from "react";
import "./ProjectListPage.css";
import NotificationBar from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import { useNavigate } from "react-router-dom";
import ProjectCards from "../../../components/cards/CourseCard";
import CourseContents from "./CourseContent";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";

export default function ProjectListPage() {
  // All the vaiables and constats used in div compoents

  const navigate = useNavigate(); // this is the navigator used to navigate
  const useAxiosForGet = useAxiosPrivate();



  // State Changes
  const [projectList, setProjectList] = useState([]); //this is list of projects where the student is enroled into and this need to be updated with the backend
  const [enrolled, setEnrolled] = useState(false);
  
  // const [hasProjects,setProjects] = useState(false);
  // Effects

  // Functions

  function loadProjectScreen(e) {

    localStorage.setItem("projectID",e.projectID);
    localStorage.setItem("team",e.courseCode);
    
   
    navigate(`./${e.projectID}/${e.courseName.split(' ').join('')}/${e.courseCode}`);
    console.log("Clicked");
  }

  const fetchProjects = async () => {
    //this resposnse will have two messages the state and the message
    console.log("Front end fetche funtion is hit");
    try {
      const response = await useAxiosForGet.get("/student/get-projects");
      return response.data;
    } catch (Error) {
      throw Error;
    }
  };

  // API calls
  const { isSuccess, isError, error, data } = useQuery({
    queryKey: ["get Projects Quary"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Data in the req"+data);
     
      setProjectList(data.data);
      setEnrolled(prev => !prev);
      
    }
  }, [data]);

  if (isError) {
    console.log(error);
    
  }

  // useEffect(()=>{
  //   if(!enrolled){
  //     setEnrolled(prev => !prev);
  //   }else{
  //     //the lec has removed those projects
  //     if(projectList.length === 0){
  //       setEnrolled(prev => !prev);
  //     }
  //   }
  // },[projectList] );

  

  // TODO:Here the error need to be grace fully handled
  

  console.log(enrolled);

  return (
    <div className="main-container">
      <NotificationBar />
      <SectionHeader title="Project List" desc="Currelty active projects" />
      <div >
          {enrolled ? (
            <div className="ListContainer">
              {projectList.map((ProjectContent, index) => (
                <ProjectCards
                  key={index}
                  courseName={ProjectContent.courseName}
                  courseCode={ProjectContent.courseCode}
                  onClick={() => {
                    loadProjectScreen(ProjectContent);
                  }}
                />
              ))}
            </div>
          ) : (
            <div >
              <h6>You have not enrolled into any units</h6>
            </div>
          )}
        </div>
      
    </div>
  );
}
