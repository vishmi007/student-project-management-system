import React, { useState } from "react";
import "./Submision.css";
import SubUploader from "../../../components/Submision_Uploader/Sub_Uploader";

export default function Submision() {

  const submisionDetails = JSON.parse(localStorage.getItem("submision"));

  console.log(submisionDetails);

  const projectDeadline = submisionDetails.projectDeadline;
  const submissionName = submisionDetails.submissionName;
  const passMark = submisionDetails.passMark;
  const projectDescription = submisionDetails.projectDescription;
  const totalMarks = submisionDetails.totalMarks;



  return (
    <div>

      <h1>Submision page</h1>
      <h6>Project dead line : {projectDeadline}</h6>
      <h6>SubmissionName : {submissionName}</h6>

      <h6>passMark : {passMark}</h6>

      <h6>projectDescription : {projectDescription}</h6>

      <h6>totalMarks : {totalMarks}</h6>

      <SubUploader subName={submisionDetails.submissionName}></SubUploader>
    </div>
  );
}
