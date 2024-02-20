/*
 * FILE: StudentEnrollment.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Page that is displayed when enrollment process fails
 * REFERENCE: None
 * LAST MOD: 08/10/2023
 */
import React, { useContext, useState } from "react";
import { EnrollmentHeader } from "../../../components/enrollment_header/EnrollmentHeader";
import EnrollmentPageImage from "../../../components/images/Astronaut.png";
import "./StudentEnrollment.css";
import Button from "../../../components/btns/Button";
import InputBox from "../../../components/inputbox/Inputbox";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import Toast from "../../../components/toast/Toast";
import { EnrollmentErrorContext } from "../../../context/student_dashboard_contexts/EnrollmentErrorContext";

export default function StudentEnrollment() {
  //CONST AND VARIABLES
  const navigate = useNavigate();
  const payload = { inviteCode: "XMZ5UT" };
  const fetchingendpoint = "/get-enrolled";
  const useAxiosForPost = useAxiosPrivate();
  const {setError} = useContext(EnrollmentErrorContext);


  //STATES AND EFFECTS
  const [code, setCode] = useState("");
  const [lastEnrolledProject, setLastEnrolledProject] = useState('');


  //FUNCTIONS
  function previousScreen() {
    navigate(-1);
  }

  function navigateToSuccessPage(lastProID){
    navigate(`./enrollment-successful/${lastProID}`);
  }

  function navigateToFailPage() {
    navigate("./enrollment-failed");
  }

  function handleCodeInput(event) {
    setCode(event.target.value);
  }

  const makeEnrolmentReq = async (payloadIn) => {
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
  const  {mutate}  = useMutation({mutationFn:makeEnrolmentReq,
  
  onSuccess:(data,variables,contect)=>{
    //TODO:Do anything aftre the mutation is success 
    console.log(data);
    // const lastEnrolledProject = data.enrolledProjects[data.enrolledProjects.length-1];
    if(data.message === "initiation" ){
      navigateToSuccessPage(data.data);
    }else{
      navigateToSuccessPage(data.projectId);
    }
   
    
  },
  onError:(error, variables, context)=>{
    //TODO:Do anything after the mutation is failed

    console.log(error.response.data.message);
    setError(error.response.data.message);
    navigateToFailPage();
  }

});



  const handleEnrollment = async () => {
    if (code == "") {
      //TODO:Make this visible to the user
      console.log("No code");
    } else {
      console.log(code);
      payload.inviteCode = code;

      mutate(payload);
      console.log(payload);
      setCode("");
      // const  makeEnrollmentAPICall  = useMutation({mutationFn:makeEnrolmentReq(payload)});
    }
  };

  return (
    <div>
      <NotificationHeader />

      <div>
        <EnrollmentHeader title="Enter Code" desc="Enter project invite code" />
        <div>
          <InputBox
            placeholder="Invite code"
            id="enrollmentCodeInput"
            handleInput={handleCodeInput}
            value={code}
            type={"text"}
          />
        </div>
      </div>
      <div className="image-container">
        <img src={EnrollmentPageImage} alt="Enrollment Page Image" />
      </div>
      <section className="mt-10 d-flex justify-content-between">
        <div>
          <Button
            color={"blue"}
            labelText={"Next"}
            onClickHandler={handleEnrollment}
          />
        </div>
        <div>
          <Button
            color={"red"}
            labelText={"Cancel"}
            onClickHandler={previousScreen}
          />
        </div>
      </section>
    </div>
  );
}
