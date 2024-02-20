/*
 * FILE: AddStudentCard
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Component to add new students to teams
 * REFERENCE: None
 * LAST MOD: 05/08/2023
 */

import React from "react";
import "./AddStudentCard.css";
import StudentCardProfile from "./StudentCardProfile";
import Button from "../../../components/btns/Button";

export default function AddStudentCard() {
  /*Text variables used with in the card block as  */
  const heading = "Invite Members";
  const subheading = "Add Email";
  const text1 = "Members"; //Here this is the Members text

  return (
    <div className="card">
      <button type="button" className="closing-button">
        X
      </button>
      <span className="card-heading">{heading}</span>
      <span className="card-subheading">{subheading}</span>
      <div className="email-input-container">
        <div className="email-input"></div>
        <Button/>
      </div>
      <span className="card-text-members">{text1}</span>
      <div className="memberlist">
        <StudentCardProfile />
        <StudentCardProfile />
        <StudentCardProfile />
      </div>
    </div>
  );
}
