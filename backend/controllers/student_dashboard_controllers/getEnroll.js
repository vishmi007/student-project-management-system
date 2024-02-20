/*
 * FILE: getEnroll.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will add the incomming new project into the resepctive students project list
 * REFERENCE: None
 * LAST MOD: 09/17/2023
 */
const { getUserByUUID } = require("../../data/Users");
const { setProjectList } = require("../../data/Users");

const { getProjectList } = require("../../data/Projects");

const getEnroll = async (req, res) => {
  // console.log("Hit the enroll controller");
  const body = req.body;
  const inviteCode = body.inviteCode;
  const projectList = [];
  const uuid = req.uuid;

  const response = await getProjectList();
  //error handling dusring reading the project list
  if (response.success == false) {
    return res.status(500).json({
      message: response.message,
    });
  }
  //project list reading is done good
  else {

    //extracting the respective project with the invite code
    const project = response.message.find(
      (project) => project.inviteCode === inviteCode
    );
    
    //check if thre is a matching project in the data base
    if (project == undefined) {
      return res.status(400).json({
        message: "Error in the enrolment code no such project to enroll",
      });
    } 
    //has a matching project
    else {
      const projectId = project.projectId;

      try {
        //check weather the respetive user exists
        const userProfile = await getUserByUUID(uuid);
        

        if (!userProfile?.projectsEnrolled) {
          console.log("No project field");
          // projectList.push(projectId);
          const response = await setProjectList(uuid, projectList);
          return res
            .status(response.status)
            .json({ "message": "initiation" , "data":projectId });
        } else {
          console.log("Has project field");

          if (userProfile.projectsEnrolled.some(joinInfo => joinInfo.projectID===projectId)) {
            //already enrolled in that given project
            return res.status(400).json({ message: "Already enrolled" });
          } else {
            //if not already enrolled send a 200 success with the projectID
            return res.status(200).json({projectId});
          }
        }
      } catch (error) {
        //TODO:what type of error is this
        res.status(500).json({ message: "Error in getting enrolled" });
        console.log("Error occured in enrolment controller");
      }
    }
  }
};

module.exports = { getEnroll };
