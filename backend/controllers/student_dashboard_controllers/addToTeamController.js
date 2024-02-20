/*
 * FILE: addToTeamController.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will add the a given user to a given team in a given project
 * REFERENCE: None
 * LAST MOD: 09/17/2023
 */
const {addToTeam} =  require("../../data/Projects"); 
const { addNewProjectToEnroll } = require("../../data/Users");
const {getProjectByID} = require("../../data/Projects");

const addToTeamController = async(req,res)=>{
    const uuid = req.uuid;
    const projectID = req.body.projectID ;
    const teamNo = req.body.teamNo ;

    const theProject = await getProjectByID(projectID);

    const joinInfo = {"projectID":projectID,"teamNo":teamNo,"projectName":theProject.message.unitName};

    const response = await addToTeam(uuid,projectID,teamNo);
    


    if(response.status === 200){
        const newEnrolment = await addNewProjectToEnroll(joinInfo, uuid);
        if(newEnrolment.status === 200){
            return res.status(200).json({"message":"Successfully Added","data":newEnrolment.response});
        }else{
            return res.status(500).json({"message":"Server side error","data":[]});
        }
        
    }else{
        return res.status(500).json({"message":response.message,"data":[]});
    }

   
}

module.exports = {addToTeamController}