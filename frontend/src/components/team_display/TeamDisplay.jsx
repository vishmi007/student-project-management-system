import React from "react";
import Button from "../btns/Button";
import "./TeamDisplay.css";

const TeamDisplay = ({ teamname, membernum, status }) => {
  status = "Test Staus";

  return (
    <div className="teamdisplay">
      <div>
        <input
          className="teamname"
          type="text"
          id="teamname"
          placeholder="Enter teamname"
        />
        <div className="mt-4 mb-5 d-flex justify-content-center">
          <div className="numberofmembers">Team Size: {membernum}</div>
        </div>
      </div>

      <section className="buttonandstatus">
        <div className="d-flex justify-content-around">
          <div className="statusdisplay">{status}</div>
          <Button color={"blue"} labelText={"Update Name"} />
        </div>
      </section>
    </div>
  );
};

export default TeamDisplay;
