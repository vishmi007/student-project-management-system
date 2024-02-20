import React from "react";
import "./Card.css";

export default function Card({ provided, item }) {
 
  return (
    <div
      className={`Task-Board ${provided.isDragging ? "dragging" : ""}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="Card-Content">{item.content.title}</div>
    </div>
  );
}
