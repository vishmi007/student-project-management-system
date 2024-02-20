/*
 * FILE: getProjects.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will return all the projects that a student is enrolled into
 * REFERENCE: None
 * LAST MOD: 09/25/2023
 */

// const { response } = require("express");
const { getUserEnrollmentProjects } = require("../../data/Users");
const { getProjectByID } = require("../../data/Projects");
const { corsOptions } = require("../../config/corsOptions");

const getProjects = async (req, res) => {
  const uuid = req.uuid;
  const courseData = [];

  try {
    const responce = await getUserEnrollmentProjects(uuid);

    if (responce.status === 200) {
      const theProjectList = responce.message;
      for (const enrollment of theProjectList) {

        const cource = {
          courseName: enrollment.projectName,
          courseCode: enrollment.teamNo,
          projectID: enrollment.projectID,
        };

        courseData.push(cource);
      }
      res.status(200).json({ message: "OK", data: courseData });
    } else {
      res.status(500).json({ message: responce.message, data: [] });
    }

    // //for each proejct code get the project info
    // if(responce.status === 200){
    //     const projectPromise = responce.message.map(async (projectCode) => {

    //         const project = await getProjectByID(projectCode);
    //         if(project.status != 200){
    //             return res.status(project.status).json(project.message);
    //         };

    //         const cource = {
    //             courseName: project.message.unitName,
    //             courseCode: project.message.unitCode,
    //             projectID: projectCode,
    //         }

    //         return cource;

    //     });

    //     const resolvedCourses = await Promise.all(projectPromise);
    //     courseData.push(...resolvedCourses);

    //     return res.status(200).json(courseData);
    // }else{
    //     return res.status(responce.status).json(responce.message);
    // }
  } catch (Error) {
    return res.status(500).json("Server side error occured");
  }
};

module.exports = { getProjects };
