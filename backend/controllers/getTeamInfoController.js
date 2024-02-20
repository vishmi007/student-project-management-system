/*
 * FILE: getProjectInfo.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Handle requests to get project specific information
 * REFERENCE: None
 * LAST MOD: 9/08/2023
 */

// const { getProjectInfoData } = require("../data/Users");

const { getKanbandata } = require("../data/Users");

const getProjectInfo = async (req, res) => {
  
  // console.log(req.user);
  // console.log(req.uuid);
  // console.log(req.role);

  console.log("Hit the getproject info controller");

  const result = await getKanbandata();

  const taskList = result;
  const toDoList = [];
  const inProgressList = [];
  const doneList = [];

  taskList.forEach((team) => {
    console.log(`Team ID: ${team.teamId}`);
    team.task.forEach((task) => {
        switch(task.status){
            case "to do":{
                    toDoList.push(task.details);
                break;
            }
            case "in progress":{
                    inProgressList.push(task.details);
                break;
            }
            case "done":{
                    doneList.push(task.details);
                break;
            }
        }
    });
  });

  const kanabanBoard = [
    {
      name: "To Do",
      items: toDoList
    },
    {
      name: "In Progress",
      items: inProgressList
    },
    {
      name: "Done",
      items: doneList
    },
  ];

  res.send(kanabanBoard);
};

module.exports = { getProjectInfo };
