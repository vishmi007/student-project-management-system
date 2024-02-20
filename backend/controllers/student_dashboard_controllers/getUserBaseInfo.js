/*
 * FILE: getUserBaseInfo.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will send nessesary welcome information needed to the welcome screen fo the student
 * REFERENCE: None
 * LAST MOD: 09/18/2023
 */
const{getUserByUUID} = require("../../data/Users");

const getUserBaseInfo = async(req,res)=>{

    //definition of the sending json object
    const userBaseInfo = {
        "name": "YourNameHere",
        "joinInfo" : []
      };

    console.log("Hit getUserBaseInfo controller");
    const response = await getUserByUUID(req.uuid);

    userBaseInfo.name = response.firstName;
    //check if the projects are initilaized or not
    if(response.hasOwnProperty("projectsEnrolled")){
      console.log("Has property identifies");
      userBaseInfo.joinInfo = response.projectsEnrolled;
    }
    

    
    res.send(userBaseInfo);

}

module.exports = {getUserBaseInfo};