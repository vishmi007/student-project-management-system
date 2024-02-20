import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleSubMilestoneCard from "../../../components/cards/SingleSubMilestoneCard";
import TeamMembersCard from "../../../components/cards/TeamMembersCard";
import Dropdown from "../../../components/dropdown/Dropdown";

export default function TeamMilestone() {
    const navigate = useNavigate();
    const [submissionFeedback, setSubmissionFeedback] = useState("");
    const teamMemberNames = ['John Smith', 'Alice Johnson', 'Bob White']; //MOCK DATA
    const options = ["Ms. Ann", "Mr. Samantha", "Ms. Geetanjali"];  //MOCK DATA

    function handlePrevious() {
        navigate(-1);
      }

      function handleSubmissionFeedback(event) {
        setSubmissionFeedback(event.target.value);
      }

      const handleDropdownSelection = (selectedValue) => {
        // Do something with the selected value, e.g., update state
        console.log('Selected value:', selectedValue);
      };

    return (
        <><NotificationHeader />
        <SectionHeader
            title='SD01 CodeSyndicate' 
            btnColor='blue'
            btnLabel='Previous'
            btnHandler={handlePrevious}
        />
        <Container fluid>
                <Row>
                    <Col sm={4} style={{ height: 'calc(100vh - 140px)', width: '60%', overflowY: 'auto' }}>
                        <div style={{ padding: '2%', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                            <SingleSubMilestoneCard
                                title="Milestone 1"
                                submittedOn="June 5th, 11:30 PM"
                                isLate={true} // Set the isLate prop as needed
                                grade="N/A"
                                feedback={submissionFeedback}
                                onFeedbackChange={handleSubmissionFeedback}
                                />

                                <SingleSubMilestoneCard
                                title="Milestone 2"
                                submittedOn="August 2nd, 11:40 PM"
                                isLate={false} // Set the isLate prop as needed
                                grade="N/A"
                                feedback={submissionFeedback}
                                onFeedbackChange={handleSubmissionFeedback}
                            />
                        </div>
                    </Col>
                    <Col sm={4} >

                    <div className='mt-1' style={{ marginLeft: '3rem', marginBottom: '2rem' }}>
                        Add Supervisors: 
                        <Dropdown
                           options={options}
                           getValue={handleDropdownSelection}
                        />
                        </div>
                        <div className='mt-1' style={{ marginLeft: '3rem', marginBottom: '2rem' }}>
                        Add Evaluators: 
                        <Dropdown
                           options={options}
                           getValue={handleDropdownSelection}
                        />
                    </div>
                    <div style={{ marginLeft: '0.8rem', marginBottom: '2%', backgroundColor: 'white', height: 'calc(100vh - 280px)', width: '30rem' }}>
                        <TeamMembersCard teamMemberNames={teamMemberNames} />
                    </div>                                
                    </Col>
                </Row>
        </Container>
        </>
    )
}