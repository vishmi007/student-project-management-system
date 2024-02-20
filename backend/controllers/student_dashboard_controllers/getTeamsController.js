/*
 * FILE: getTeamsController.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This controller will return all teams respective to a given project code
 * REFERENCE: None
 * LAST MOD: 09/25/2023
 */

const { getProjectByID } = require("../../data/Projects");

const getTeamsController = async (req, res) => {
  console.log("hit the get teams controller");
  projectID = req.body.projectID;

  const teamData = [];

  const responce = await getProjectByID(projectID);

  if (responce.status === 200) {

    const teams = responce.message.teams;

    for (const team in teams) {
      if (teams.hasOwnProperty(team)) {
        const teamObject = teams[team];

        if (teamObject.isMaxcapacity === false) {
          const teamProfile = {
            status: "Pending",
            name: team,
            description: "Des",
            time: 10,
            imageURL:
              "https://img.freepik.com/premium-vector/business-social-media-manager-flat-illustration_540907-16.jpg",
          };


          teamData.push(teamProfile);
        }
      }
    }
    res.status(200).json(teamData);
  } else {
    res.status(500).json("Serverside Error occured");
  }
};

module.exports = { getTeamsController };
