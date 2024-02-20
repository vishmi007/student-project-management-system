const { getProjectsByUuid } = require("../../data/Projects");

/** @type {import("express").RequestHandler} */
const getProjects = async (req, res) => {
  const dbResponse = await getProjectsByUuid(req.uuid);

  if (!dbResponse.success)
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving project details" });

  const projectInfoList = dbResponse?.projects.map((project) => {
    return {
      projectId: project?.projectId,
      courseName: project?.unitName,
      courseCode: project?.unitCode,
      teamNum: project?.totalTeams,
    };
  });

  return res.status(200).json({ projectsList: projectInfoList });
};

module.exports = { getProjects };
