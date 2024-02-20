import React from "react";
import "./Column.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DropZone from "./DroppableZone";
import "./Column.css";

function Column({ columnId, column }) {
  return (
    <div className="Column" key={columnId}>
      <div className="d-flex justify-content-between">
        {/* <div className="topic">{column.name}</div> */}
        <h6>{column.name}</h6>
      </div>

      <div className="Drop_Zones">
        {/* This the definition of dropable contextx with in the main columsn where droppable is valid */}
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return <DropZone provided={provided} column={column} />;
          }}
        </Droppable>
      </div>
    </div>
  );
}

export default Column;
