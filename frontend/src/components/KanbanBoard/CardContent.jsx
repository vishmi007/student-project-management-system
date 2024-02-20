import React from "react";

class CardContent {
  constructor(
    taskTitle,
    priorityLevel,
    description,
    assignedMembers,
    comments
  ) {
    this.taskTitle = taskTitle;
    this.priorityLevel = priorityLevel;
    this.description = description;
    this.assignedMembers = assignedMembers;
    this.comments = comments;
  }
}

export default CardContent;
