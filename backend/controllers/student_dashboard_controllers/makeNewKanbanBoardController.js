/*
 * FILE: makeNewKanbanController.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will return uinque ID of the given kanaban board
 * REFERENCE: None
 * LAST MOD: 10/01/2023
 */

const { initializeKanban} = require("../../data/Student_Dashboard");



const makeNewKanbanBoardController = async(req,res)=>{
    console.log("Hit the get make new kanaban board controller");

    const teamID = req.body.teamID

    const theKanbanBoard = {
        "teamId": teamID,
        "task": []
      }

    const result = await initializeKanban(theKanbanBoard);

    if(result.status === 200){
        return res.status(200).json({message:"OK",data:result.data});
    }else{
        return res.status(result.status).json({message:result.data,data:[]});
    }


 
};

module.exports = {makeNewKanbanBoardController}