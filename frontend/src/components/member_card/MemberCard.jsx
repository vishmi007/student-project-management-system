import React from "react";
import "./MemberCard.css";
import newimg from "../images/Astronaut.png";
const MemberCard = ({ name, email }) => {
  const memberName = name;
  const memberEmail = email;

  return (
    <div className="membercard">
      <div className="d-flex justify-content-start">
        <div className="p-2">
          <div className="imagecontainer">
            <img src={newimg} alt="Member IMG" />
          </div>
        </div>
        <div className="nametag">{memberName}</div>
        <div className="email">{memberEmail}</div>
      </div>
    </div>
  );
};

export default MemberCard;
