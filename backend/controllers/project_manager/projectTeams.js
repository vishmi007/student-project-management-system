const { getInchargeTeams } = require("../../data/Projects");

/** @type {import("express").RequestHandler} */
const getSupervisorTeams = async (req, res) => {
  const role = "supervisors";
  const dbResponse = await getInchargeTeams(
    req.params.projectid,
    req.user,
    role
  );
  if (!dbResponse) res.sendStatus(500);
  res.status(dbResponse.status).send(dbResponse.response);
};

/** @type {import("express").RequestHandler} */
const getEvaluatorTeams = async (req, res) => {
  const role = "evaluators";
  const dbResponse = await getInchargeTeams(
    req.params.projectid,
    req.user,
    role
  );
  if (!dbResponse) res.sendStatus(500);
  res.status(dbResponse.status).send(dbResponse.response);
};

module.exports = { getSupervisorTeams, getEvaluatorTeams };