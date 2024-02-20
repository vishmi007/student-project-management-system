const ROLES_LIST = require("../../config/rolesList");
const { getProjectTeams } = require("../../data/Projects");

const getTeamsForLecturer = async (projectId) => {
  const dbResponse = await getProjectTeams(projectId);
  return dbResponse;
};
const getTeamsForEvaluator = () => {
  console.log("get teams for evaluators");
};
const getTeamsForSupervisor = () => {
  console.log("get teams for supervisors");
};

const convertValueToRoleString = (roleValue) => {
  if (roleValue === undefined) return;
  for (const roleName in ROLES_LIST) {
    if (ROLES_LIST[roleName] === roleValue) {
      return roleName;
    }
  }
};

const getTeamsFunctionRefs = {
  Lecturer: getTeamsForLecturer,
  Supervisor: getTeamsForSupervisor,
  Evaluator: getTeamsForEvaluator,
};

// singleSubBluePrint
// milestoneSubBluePrint

/** @type {import("express").RequestHandler} */
const getTeams = async (req, res) => {
  const projectId = req.url.split("/")[2];
  const userRoleStr = convertValueToRoleString(req.role);

  const getTeamsHandler = getTeamsFunctionRefs[userRoleStr];
  const dbResponse = await getTeamsHandler(projectId);

  // get the project id and iterate through
  res.status(dbResponse.status).json(dbResponse.response);
};

module.exports = { getTeams };
