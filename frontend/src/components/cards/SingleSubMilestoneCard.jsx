import React from 'react';
import Card from 'react-bootstrap/Card';
import TextAreaInput from "../text_area_input/TextAreaInput";
import Button from '../btns/Button';


export default function  SingleSubMilestoneCard({ title, submittedOn, isLate, grade, feedback, onFeedbackChange }) {
    const lateStatus = isLate ? 'Late' : 'On time';

    return (
        <Card style={{ border: '1px solid lightgrey', marginBottom: '2%', flex: '0 0 auto', height: '66.5%', width: '100%', backgroundColor: 'white' }}>
          <Card.Body>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'black', fontFamily: 'Poppins' }}>{title}</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '450', color: 'black', fontFamily: 'Poppins', marginRight: '2rem' }}>Submitted on: {submittedOn}</div>
                <div style={{ backgroundColor: isLate ? 'lightcoral' : '#67B165', borderRadius: '0.5rem', padding: '0.4rem 1.8rem', color: 'white', fontSize: '0.8rem' }}>{lateStatus}</div>
              </div>
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '1rem', fontFamily: 'Poppins' }}>
              Grade: {grade}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <Button 
                labelText="Download Submission" 
                color="blue"
                size="small" 
                onClickHandler={() => {
                     // Handle download submission click
                }}/> 
              <Button 
                labelText="View Rubric"
                color="blue"
                size="small" 
                onClickHandler={() => {
                  // Handle view rubric click
                }}/>
              <Button 
                labelText="Grade"
                color="blue"
                size="small" 
                onClickHandler={() => {
                  // Handle view rubric click
                }}/>
              <Button 
                labelText="View Assignment Specification"
                size="small" 
                color="blue"
                onClickHandler={() => {
                  // Handle grade click
                }}
                ></Button>             
            </div>
            <div className="mt-4">
              <TextAreaInput
                label="Submission Feedback:"
                placeholder="Enter your feedback here..."
                getInputValue={onFeedbackChange}
                value={feedback}
                customStyle={{ width: '38rem', height: '5rem' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, marginTop: '1rem' }}>
              <Button 
                labelText="Save"
                size="smaller" 
                color="blue"
                onClickHandler={() => {
                  // Handle grade click
              }}/>
              <Button 
                labelText="Cancel"
                size="smaller" 
                color="blue"
                onClickHandler={() => {
                  // Handle grade click
              }}/>  
              
            </div>
          </Card.Body> 
        </Card>
      );
}