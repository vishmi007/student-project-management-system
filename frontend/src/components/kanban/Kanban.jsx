import React from "react";
import "./Kanban.css";
import KanbanStates from "./KanbanStates";
const Kanban = () => {
  return (
    <div className="kanban-container">
      <div className="d-flex justify-content-start">
        <KanbanStates state="To Do" />
        <KanbanStates state="In Progress" />
        <KanbanStates state="Completed" />
      </div>
    </div>
  );
};

export default Kanban;
