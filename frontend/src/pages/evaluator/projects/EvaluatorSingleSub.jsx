import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SingleSubMilestoneCard from "../../../components/cards/SingleSubMilestoneCard";
import TeamMembersCard from "../../../components/cards/TeamMembersCard";
import Dropdown from "../../../components/dropdown/Dropdown";

export default function EvaluatorSingleSub() {
  const navigate = useNavigate();
  const [submissionFeedback, setSubmissionFeedback] = useState("");
  const teamMemberNames = ["John Smith", "Alice Johnson", "Bob White"]; //MOCK DATA
  const options = ["Ms. Ann", "Mr. Samantha", "Ms. Geetanjali"]; //MOCK DATA

  function handlePrevious() {
    navigate(-1);
  }

  function handleSubmissionFeedback(event) {
    setSubmissionFeedback(event.target.value);
  }

  const handleDropdownSelection = (selectedValue) => {
    // Do something with the selected value, e.g., update state
    console.log("Selected value:", selectedValue);
  };

  return (
    <>
      <NotificationHeader />
      <SectionHeader
        title='SD01 CodeSyndicate'
        btnColor='blue'
        btnLabel='Previous'
        btnHandler={handlePrevious}
      />
      <Row>
        <Col
          sm={4}
          style={{
            height: "calc(100vh - 140px)",
            width: "60%",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "2%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SingleSubMilestoneCard
              title='Assignment 1'
              submittedOn='June 5th, 11:30 PM'
              isLate={true}
              grade='N/A'
              feedback={submissionFeedback}
              onFeedbackChange={handleSubmissionFeedback}
            />
          </div>
        </Col>
        <Col sm={4}>
          <div className='mt-1' style={{ marginLeft: "3rem" }}>
            <Dropdown options={options} getValue={handleDropdownSelection} />
          </div>
          <div
            className='mt-1'
            style={{ marginLeft: "3rem", marginBottom: "2rem" }}
          >
            <Dropdown options={options} getValue={handleDropdownSelection} />
          </div>
          <div
            style={{
              marginLeft: "0.8rem",
              backgroundColor: "white",
              height: "calc(100vh - 280]px)",
              width: "30rem",
            }}
          >
            <TeamMembersCard teamMemberNames={teamMemberNames} />
          </div>
        </Col>
      </Row>
    </>
  );
}
