/*
 * FILE: updateKanban.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will update the kanaban when ever a move is made between different columns
 * REFERENCE: None
 * LAST MOD: 10/01/2023
 */

const { getKanbanFromID } = require("../../data/Student_Dashboard");
const { getProjectByID } = require("../../data/Projects");
const {updateKanban} = require("../../data/Student_Dashboard");

const UpdateKanban = async(req,res)=>{
    console.log("Hit the Update Kanban controller");

    try{
        const projectID = req.body.projectID;
        const teamNo = req.body.teamNo;
        const change = req.body.change;


        const theProject = await getProjectByID(projectID);
        if (theProject.status === 200) {
          const theSelectedTeam = theProject.message.teams[teamNo];
          const kanbanID = theSelectedTeam.kanbanBoardId;
      
          const result = await getKanbanFromID(kanbanID);
          if(result.status === 200){


            const taskList = result.data.task;
            for(const task of taskList){
                if(task.details.id === change.taskId){
                    
                    task.status = change.newState;
                    
                }
            }


            const updateResult = await updateKanban(taskList,kanbanID);
            
            if(updateResult.status === 200){
                return res.status(200).json({message:"Ok",data:""});
            }else{
                console.log("Error when updating the kanban");
                return res.status(500).json({message:"Server side error",data:""});
            }


          }else{
            console.log("Error in the given kanban code no such kanban doc");
            return res.status(500).json({message:"Server side error",data:""});

          }
        }else{
            console.log("Error in the given project code no such project");
            return res.status(500).json({message:"Server side error",data:""});
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Server side error",data:""});
    }


}

module.exports = {UpdateKanban}