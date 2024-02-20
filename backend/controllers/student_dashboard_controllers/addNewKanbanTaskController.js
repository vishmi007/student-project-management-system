/*
 * FILE: makeNewKanban.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will make a new kanaban to a specific team ID and make is accesible to the front end (a new kanaban document will be made)
 * REFERENCE: None
 * LAST MOD: 09/17/2023
 */

const { getKanbanFromID } = require("../../data/Student_Dashboard");
const { updateKanban } = require("../../data/Student_Dashboard");
const {getProjectByID} = require("../../data/Projects");

const addNewKanbanTaskController = async (req, res) => {
  console.log("Hit the add New Kanban task controller");

  const newTask = req.body;
  const teamID = newTask.teamID;
  const projectID = newTask.projectID;




  const theProject = await getProjectByID(projectID);
  if (theProject.status === 200) {
    const theSelectedTeam = theProject.message.teams[teamID];
    const kanbanID = theSelectedTeam.kanbanBoardId;

  

    //makign the new task object
    const task = {
      details: {
        id: "",
        content: {
          title: newTask.taskName,
          description: newTask.description,
          priority: newTask.priorityLevel,
        },
      },
      status: "to do",
    };

    const kanbanBoard = await getKanbanFromID(kanbanID);
    const kanbanBoardData = kanbanBoard.data;


    //check for potencial error in the database operations
    if (kanbanBoard.status === 200) {
      const taskList = kanbanBoardData.task;

      if(taskList.length === 0){
        const newTaskID = 0;
        task.details.id = newTaskID;
      }else{
        const newTaskID = taskList.length;
        task.details.id = newTaskID;
      }
      // const newTaskID = taskList.length + 1;
     

      taskList.push(task);

      //call for update
      const updateResult = await updateKanban(taskList, kanbanID);


      // reformat the data
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

      const updatedTaskList = updateResult.data.task;
      
        for (const task of updatedTaskList) {
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
        
      

  



      if (updateResult.status === 200) {
        return res.status(200).json({ message: "OK", data: kanabanBoard });
      } else {
        return res.status(500).json({ message: updateResult.data, data: [] });
      }


    } else {
      return res
        .status(kanbanBoard.status)
        .json({ message: kanbanBoard.data, data: [] });
    }
  } else {
    console.log(
      "Issue in the extracting projects in the add New kanban task controller"
    );
    return res.status(500).json({ message: theProject.message, data: [] });
  }

  //get the resepctive kanaban board
  //make a new id for the task
  //make the object
  //make the final object
  //call for the database update
};

module.exports = { addNewKanbanTaskController };
