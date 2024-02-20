import React from "react";
import "./Kanban.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const KanbanStates = ({ state }) => {
  return (
    <div className="kstate">
      <div className="d-flex justify-content-between">
        <div className="kstate-topic">{state}</div>
        <button className="addbutton">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default KanbanStates;
