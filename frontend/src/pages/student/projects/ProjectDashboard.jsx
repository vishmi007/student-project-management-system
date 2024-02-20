/*
 * FILE: Project Dashboard
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Main dashboard view that the students will see when they clik on the projects tab
 * REFERENCE: None
 * LAST MOD: 07/08/2023
 */
import React, { useEffect } from "react";
import "./ProjectDashboard.css";
import NotificationBar from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import DataSummaryComponent from "../../../components/data_summary/DataSummary";
import ToDoBoard from "../../../components/KanbanBoard/Kanban";
import SubUploader from "../../../components/Submision_Uploader/Sub_Uploader";
import Button from "../../../components/btns/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ProjectDashboard(props) {
  //CONSTANTS AND VARIABLES
  const projectName = "CCP-02";
  const navigate = useNavigate();
  const useAxiosForPost = useAxiosPrivate();

  //STATES AND USE EFFECTS
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [submissions, setSubmissions] = useState([" "]);
  const [projectID, setProjectID] = useState("");
  //FUNCTIONS

  const fetchSubmissions = async (projectID) => {
    //this resposnse will have two messages the state and the message
    const payload = {
      projectID: localStorage.getItem("projectID"),
    };

    try {
      const response = await useAxiosForPost.post(
        "/student/get-submision/details",
        payload
      );
      return response.data;
    } catch (Error) {
      throw Error;
    }
  };

  function handleAddBtn() {
    console.log("Add button clicked");
  }

  function handleAddSubmision(submision) {
    console.log(submision);
    localStorage.setItem("submision",JSON.stringify(submision));
    navigate(`./submision`);
    console.log("Clicked");
  }

  const handleFileSelect = (files) => {
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFileNames(fileNames);
  };

  //API CALLS

  const getSubmisionDetails = useQuery({
    queryKey: ["Submision Details"],
    queryFn: fetchSubmissions,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (getSubmisionDetails.isSuccess) {
      console.log("Data is");
      console.log(getSubmisionDetails.data.data);
      if (getSubmisionDetails.data.data.type === "milestoneBlueprint") {
        localStorage.setItem("type","milestone-submision");
       
        localStorage.setItem("mileStone",getSubmisionDetails.data.data.submisionDetails.submissionName);
        setSubmissions(getSubmisionDetails.data.data.submisionDetails);
      } else if (getSubmisionDetails.data.data.type === "singleSubBlueprint") {
        localStorage.setItem("type","single-submision");
        const submision = getSubmisionDetails.data.data.submisionDetails;
        const singleSubArray = [];
        singleSubArray.push(submision);

        setSubmissions(singleSubArray);
      }
    } else if (getSubmisionDetails.isError) {
      console.log(getSubmisionDetails.data.message);
    }
  }, [getSubmisionDetails.data]);

  return (
    <div className="view">
      <NotificationBar />
      <SectionHeader
        title={`Project Dashboard - ${projectName}`}
        desc=""
        btnColor="blue"
        btnLabel="Add Members"
      />

      <div className="data-container">
        <div className="the-data-one">
          <DataSummaryComponent heading="Total Hours" value="10H" />
        </div>
        <div className="the-data-two">
          <DataSummaryComponent heading="Total Hours" value="10H" />
        </div>
        <div className="the-data-three">
          <DataSummaryComponent heading="Total Hours" value="10H" />
        </div>
      </div>

      <div className="home-container">
        <div className="container-two">
          <div className="container-submisions">
            <h6>Submitions</h6>
            {submissions.map((submision, index) => {
              return (
                <h6 key={index} onClick={()=>handleAddSubmision(submision)}>
                  {submision.submissionName}
                </h6>
              );
            })}
          </div>
          <div className="container-lec-docs">
            <h6>Lec Docs</h6>
          </div>
        </div>
        <div className="container-three">
          {/* <ToDoBoard fetchendpoint="/gettodolist" /> */}
        </div>
        <div className="container-one">
          <div className="container-members">
            <h6>Members</h6>
          </div>
          <div className="container-docs">
            <h6>Docs</h6>
            <SubUploader
              selectedFileNames={selectedFileNames}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
