/*
 * FILE: getToDoList.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This will handle all the request from the students dashboards to load the todo lists only
 * REFERENCE: None
 * LAST MOD: 09/15/2023
 */

const { getKanbandata } = require("../../data/Student_Dashboard");

const getProjectToDoList = async (req, res) => {

  console.log("Hit the get project to do list");

  const result = await getKanbandata();

  const taskList = result;
  const toDoList = [];

  taskList.forEach((team) => {
    console.log(`Team ID: ${team.teamId}`);
    team.task.forEach((task) => {
        if(task.status == "to do"){
            toDoList.push(task.details);
        }
    });
  });

  const kanabanBoard = [
    {
      name: "To Do",
      items: toDoList
    }
  ];

  res.send(kanabanBoard);
};

module.exports = { getProjectToDoList };
