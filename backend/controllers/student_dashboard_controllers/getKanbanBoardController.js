/*
 * FILE: getKanbanBoardController.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will return the specific kanaban board of the given project
 * REFERENCE: None
 * LAST MOD: 09/17/2023
 */

const { getKanbanFromID } = require("../../data/Student_Dashboard");
const { getProjectByID } = require("../../data/Projects");

const getKanbanBoardController = async (req, res) => {
  console.log("Hit the get kanaban board controller");
  const teamID = req.body.teamID;
  const projectID = req.body.projectID;

  const theProject = await getProjectByID(projectID);
  if (theProject.status === 200) {
    const theSelectedTeam = theProject.message.teams[teamID];
    const kanbanID = theSelectedTeam.kanbanBoardId;

    const result = await getKanbanFromID(kanbanID);
    if (result.status === 200) {
      // Object stucture definition
      const toDoList = [];
      const inProgressList = [];
      const doneList = [];
      const kanabanBoard = [
        {
          name: "To Do",
          items: toDoList,
        },
        {
          name: "In Progress",
          items: inProgressList,
        },
        {
          name: "Done",
          items: doneList,
        },
      ];

      const taskList = result.data.task;


      if (taskList.length === 0) {
        //No initialized task in the kanban
      } else {
        // already initialzed kanban
        for (const task of taskList) {
          switch (task.status) {
            case "to do": {
              toDoList.push(task.details);
              break;
            }
            case "in progress": {
              inProgressList.push(task.details);
              break;
            }
            case "done": {
              doneList.push(task.details);
              break;
            }
          }
        }
      }

      return res.status(200).json({ message: "Ok", data: kanabanBoard });

      
    } else {
      console.log(
        "Error in the kanban fetching fetcing in getKanban board controller"
      );
      return res.status(500).json({ message: "Server side error", data: [] });
    }

   
  } else {
    console.log("Error in the project fetcing in getKanban board controller");
    return res.status(500).json({ message: "Server side error", data: [] });
  }
};

module.exports = { getKanbanBoardController };
