/*
 * FILE: AllTeamsList.jsx
 * AUTHOR: Shamika Kumarasinghe [20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Page that is used to display all the current active projects
 * REFERENCE: None
 * LAST MOD: 16/08/2023
 */

import "./TeamCard.css";


export default function AllTeamList({imageURL,status,name,description,time,triggerFunction}) {
    // variables
    const imageAddress = imageURL;
    const teamStatus = status;
    const teamName = name;
    const teamDes = description;
    const buttonText = "View";
    const timeRemain = time;
    const trigger = triggerFunction;
   
    

    // state changes
    // effects
    // funtions
    
  
    return (
      <div className="TeamCard">
        <div className="MainContainer">
          <img
            className="CardImage"
            src={imageAddress}
            alt="alternative_text_here"
          />
  
          <div className="Status">
            <div className="StarusInfo">{teamStatus}</div>
          </div>
          <div className="TeamName">{teamName}</div>
          <div className="TeamDescription">
            {teamDes}
          </div>
          <div className="TimerContainer">
            <button className="ViewButton" onClick={trigger}>{buttonText}</button>
            <div className="EndsIn">Ends In : </div>
            <div className="Time">{timeRemain}H</div>
          </div>
        </div>
      </div>
    );
  }
  