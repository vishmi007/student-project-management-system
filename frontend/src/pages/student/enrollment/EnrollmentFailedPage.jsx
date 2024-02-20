/*
 * FILE: EnrollmentFailedPage.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Page that is displayed when enrollment process fails
 * REFERENCE: None
 * LAST MOD: 07/08/2023
 */
import React, { useContext } from "react";
import { EnrollmentHeader } from "../../../components/enrollment_header/EnrollmentHeader";
import "./StudentEnrollment.css";
import EnrollmentFailedImg from "../../../components/images/FailedImg.png";
import Button from "../../../components/btns/Button";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import { useNavigate } from "react-router-dom";
import { EnrollmentErrorContext } from "../../../context/student_dashboard_contexts/EnrollmentErrorContext";



export default function EnrollmentFailedPage() {

  //CONSTANTS AND VARIBALES
  const navigate = useNavigate();
  const {errorVal} = useContext(EnrollmentErrorContext);

  //FUNCTIONS
  function previousScreen() {
    navigate(-1);
  }

  //STATES AND EFFECTS


  //API CALLS

  console.log("This is the error form the use context"+errorVal);
  return (
    <div>
      <NotificationHeader />
      <EnrollmentHeader
        title={errorVal}
        desc="Please Enter The Correct Invite Code"
      />
      <div className="image-container-2">
        <img src={EnrollmentFailedImg} alt="Enrollment Failed Image" />
      </div>
      <div className="mt-10 d-flex justify-content-center">
        <Button
          color={"red"}
          labelText={"Re-enter Code"}
          onClickHandler={previousScreen}
        />
      </div>
    </div>
  );
}
