/*
 * FILE: AllTeamsList.jsx
 * AUTHOR: Shamika Kumarasinghe [20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Page that is used to display all the current active projects
 * REFERENCE: None
 * LAST MOD: 16/08/2023
 */

import React, { useEffect, useState } from "react";
import SectionHeader from "../../../components/section_header/SectionHeader";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import TeamCard from "../../../components/teamCard/TeamCard";
import "./AllTeamsList.css";
import TeamData from "./TeamDataDummy";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function AllTeamList() {
  // variables
  
  const navigator = useNavigate();
  const useAxiosForPost = useAxiosPrivate();
  const fetchingendpoint = "student/get-teams";

  // state changes
  const [currentURL, setCurrentURL] = useState("");
  const [projectID, setProjectID] = useState("");
  const [teamDataList,setTeamDataList] = useState([]);
  // effects
  // funtions
  function moveToTeamPage(teamData) {
    navigator(`./${teamData.name.split(" ").join("")}`);
  }

  // useEffect(()=>{
  //   setCurrentURL(window.location.href);
  // },);

 

  //extracting the proejct ID form

  const makeTeamReq = async (payloadIn) => {
    try {
      const response = await useAxiosForPost.post(fetchingendpoint, payloadIn);
      return response.data;
      // Process userData...
    } catch (error) {
      // Handle error
      throw error;
    }
  };

  //API CALLS
  const { mutate } = useMutation({
    mutationFn: makeTeamReq,

    onSuccess: (data, variables, contect) => {
      //TODO:Do anything aftre the mutation is success
      console.log(data);
      setTeamDataList(data);

    },
    onError: (error, variables, context) => {
      //TODO:Do anything after the mutation is failed
      console.log(error.response.data);
    },
  });


  useEffect(() => {
    const currentURL = window.location.href;
    const segment = currentURL.split("/"); // extractign the proejctID form the URL
    const needed = segment.indexOf("allteams");
    const theProjectID = segment[needed - 1];

    console.log(theProjectID);
    mutate({ "projectID":theProjectID});
    setProjectID(theProjectID);
  },[]);


  return (
    <>
      <NotificationHeader />
      <SectionHeader title="Team List" desc="All active team list" />
      <div className="TeamList">
        {teamDataList.map((teamData, index) => (
          <TeamCard
            key={index}
            imageURL={teamData.imageURL}
            status={teamData.status}
            name={teamData.name}
            description={teamData.description}
            time={teamData.time}
            triggerFunction={() => moveToTeamPage(teamData)}
          />
        ))}
      </div>
    </>
  );
}
