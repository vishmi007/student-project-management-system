const {
  getProjectsForSupervisor,
  getProjectsForEvaluator,
} = require("../../data/Projects");

/** @type {import("express").RequestHandler} */
const getSupervisorProjects = async (req, res) => {
  const dbResponse = await getProjectsForSupervisor(req.user);

  if (!dbResponse)
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving project details" });

  const projectInfoList = dbResponse?.map((project) => {
    return {
      projectId: project?.projectId,
      courseName: project?.unitName,
      courseCode: project?.unitCode,
      teamNum: project?.totalTeams,
    };
  });

  return res.status(200).json({ projectsList: projectInfoList });
};

/** @type {import("express").RequestHandler} */
const getEvaluatorProjects = async (req, res) => {
  const dbResponse = await getProjectsForEvaluator(req.user);

  if (!dbResponse)
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving project details" });

  const projectInfoList = dbResponse?.map((project) => {
    return {
      projectId: project?.projectId,
      courseName: project?.unitName,
      courseCode: project?.unitCode,
      teamNum: project?.totalTeams,
    };
  });

  return res.status(200).json({ projectsList: projectInfoList });
};

module.exports = { getSupervisorProjects, getEvaluatorProjects };
