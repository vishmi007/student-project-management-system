import React from "react";
import "./MemberDisplay.css";
import MemberCard from "../member_card/MemberCard";
const MemberDisplay = () => {
  return (
    <div className="memberdisplay">
      <div className="pt-3 pb-3">
        <div className="title">Team Members</div>
      </div>
      <div className="member-list">
        <MemberCard name={"Vansitha"} email={"vansitha@gmail.com"} />
        <MemberCard name={"Vishmi"} email={"vishmi@gmail.com"} />
        <MemberCard name={"Nikita"} email={"nikita@gmail.com"} />
        <MemberCard name={"Gaveen"} email={"gaveen@gmail.com"} />
      </div>
    </div>
  );
};

export default MemberDisplay;
