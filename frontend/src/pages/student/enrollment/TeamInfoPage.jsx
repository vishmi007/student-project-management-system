/*
 * FILE: TeamInfoPage.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Page that is displays team information
 * REFERENCE: None
 * LAST MOD: 08/16/2023
 */
import React, { useState } from "react";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import TeamDisplay from "../../../components/team_display/TeamDisplay";
import MemberDisplay from "../../../components/member_display/MemberDisplay";
import { useEffect } from "react";
import Button from "../../../components/btns/Button";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EnrollmentErrorContext } from "../../../context/student_dashboard_contexts/EnrollmentErrorContext";





export default function TeamInfoPage() {

  //CONST AND VARIBALES
  const useAxiosForPost = useAxiosPrivate();
  const fetchingendpoint = "/student/add-to-teams"
  const navigate = useNavigate();
  const {setProjectList} = useContext(EnrollmentErrorContext);


  //STATE AND EFFECTS
  const [joinData , setJoinData] = useState({"projectID":" ","teamNo":" "});


  useEffect(() => {
    const currentURL = window.location.href;
    const segment = currentURL.split("/"); // extractign the proejctID form the URL
    const needed = segment.indexOf("allteams");
    const theProjectID = segment[needed - 1];
    const theTeamID = segment[needed + 1];

    console.log({"projectID":theProjectID,"teamNo":theTeamID});
    setJoinData({"projectID":theProjectID,"teamNo":theTeamID});
    // mutate({ "projectID":theProjectID});
    // setProjectID(theProjectID);
  },[]);


   //FUNCTIONS
   function makeAJoinReq(){
    const payload = joinData;
    console.log("Printing the joining payload"+payload);
    console.log(payload);
    mutate(payload);
  }

  function navigateToMainDashBoard(){
    navigate("/student/home");
  }


  const joinATeamReq = async (payloadIn) => {
    try {
      const response = await useAxiosForPost.post(fetchingendpoint, payloadIn);
      return response.data;
      // Process userData...
    } catch (error) {
      // Handle error
      throw error;
    }
  };

  //APIS
  const  {mutate}  = useMutation({mutationFn:joinATeamReq,
  
    onSuccess:(data,variables,context)=>{
      //TODO:Do anything aftre the mutation is success 
      // console.log(data);
      // console.log(data.data);
      setProjectList(data.data);
      
      navigateToMainDashBoard();
      
    },
    onError:(error, variables, context)=>{
      //TODO:Do anything after the mutation is failed
  
      console.log(error.response.data.message);

    }
  
  });

 

  return (
    <div>
      <NotificationHeader />
      <SectionHeader title="Team Information" />
      <div className="d-flex justify-content-between">
        <TeamDisplay />
        <MemberDisplay />
        
      </div>
      <Button
        
          labelText={"Confirm joing"}
          color={"blue"}
          size={"large"}
          onClickHandler={makeAJoinReq}

        />
    </div>
  );
}
