/*
 * FILE: getSubmisions.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will return all the sunmision related info
 * REFERENCE: None
 * LAST MOD: 10/12/2023
 */



const { getProjectByID } = require("../../data/Projects");


const getSubmisions = async (req, res) => {
    console.log("Hit the get submision controller");

    try{

        const projectID = req.body.projectID;
        const responce =  await getProjectByID(projectID);

        if(responce.status === 200){

            console.log(responce.message);
            const project = responce.message;

       

            if(project.hasOwnProperty("singleSubBlueprint")){
                const type = "singleSubBlueprint";
                const submisionDetails = project.singleSubBlueprint
                const submisions = {"type":type,"submisionDetails":submisionDetails};
                res.status(200).json({message:"OK",data:submisions});

            }else if(project.hasOwnProperty("milestoneBlueprint")){
                const type = "milestoneBlueprint";
                const submisionDetails = project.milestoneBlueprint;
                const submisions = {"type":type,"submisionDetails":submisionDetails};
                res.status(200).json({message:"OK",data:submisions});
               
            }else{
                console.log("No submision have initilized");
                res.status(500).json({message:"No submisions have initialized",data:""});
            }
            


           

        }else{
            console.log(responce.message);
            res.status(500).json({message:responce.message,data:""});
        }



        

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Server side error",data:""});
    }



//   const uuid = req.uuid;
//   const courseData = [];

//   try {
//     const responce = await getUserEnrollmentProjects(uuid);
//     const theProjectList = responce.message;

//     if (responce.status === 200) {
//       for (const enrollment of theProjectList) {

//         const cource = {
//           courseName: enrollment.projectName,
//           courseCode: enrollment.teamNo,
//           projectID: enrollment.projectID,
//         };

//         courseData.push(cource);
//       }
//       res.status(200).json({ message: "OK", data: courseData });
//     } else {
//       res.status(500).json({ message: "Internal server error", data: [] });
//     }

//   } catch (Error) {
//     return res.status(500).json("Server side error occured");
//   }
};

module.exports = { getSubmisions };
