import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import "./DroppableZone.css"

function DroppableZone({provided, column}) {
  return (
 
      <div
        className="Drop-Zone"
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {column.items.map((item, index) => {
          return (
            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
              {(provided, snapshot) => {
                return <Card provided={provided} item={item} />;
              }}
            </Draggable>
          );
        })}
        {provided.placeholder}
      </div>
    
  );
}

export default DroppableZone;
