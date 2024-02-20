/*
 * FILE: AddCardProfile
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Component to add new students to teams
 * REFERENCE: None
 * LAST MOD: 05/08/2023
 */
import React from "react";
import "./StudentCardProfile.css";

export default function StudentCardProfile() {
  return (
    <div  className="component-container">
      <img
        src="https://blob.sololearn.com/avatars/75aeefa4-d611-4799-b2a5-6ba8f06fac7e.jpg"
        alt="https://blob.sololearn.com/avatars/75aeefa4-d611-4799-b2a5-6ba8f06fac7e.jpg"
        id="profile-pic"
        className="component-image"
      />
      <div className="component-container1">
        <span id="student-name" className="component-text">
          Akbo Perera
        </span>
        <span id="student-email" className="component-text1">
          Akbo@sliit.com
        </span>
      </div>
      <span id="info-1" className="component-text2">
        Team leader
      </span>
      <span id="info-2" className="component-text3">
        Full access
      </span>
    </div>
  );
}
