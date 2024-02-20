/*
 * FILE: EnrollmentSuccessfulPage.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Page that is displayed when enrollment process is successful
 * REFERENCE: None
 * LAST MOD: 07/08/2023
 */
import React from "react";
import { EnrollmentHeader } from "../../../components/enrollment_header/EnrollmentHeader";
import "./StudentEnrollment.css";
import EnrollmentSuccessfulImg from "../../../components/images/SuccessfulImg.png";
import Button from "../../../components/btns/Button";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import { useNavigate } from "react-router-dom";

export default function EnrollmentSuccessful() {
  //CONSTANTS AND VARIABLES
  const nagigator = useNavigate();
  //FUNCTIONS
  function handleViewTeams(){
    nagigator("./allteams");
  }
  return (
    <div>
      <NotificationHeader />
      <EnrollmentHeader
        title="Welcome to Your Project"
        desc="Project Enrollment Successful"
      />
      <div className="image-container-2">
        <img src={EnrollmentSuccessfulImg} alt="Enrollment Successful Image" />
      </div>
      <div className="mt-10 d-flex justify-content-center">
        <Button onClickHandler={handleViewTeams} color={"blue"} labelText={"Join a Team"} />
      </div>
    </div>
  );
}
