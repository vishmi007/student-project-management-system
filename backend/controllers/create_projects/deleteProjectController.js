const { deleteProject } = require("../../data/Projects");

/** @type {import("express").RequestHandler} **/
const handleProjectDelete = async (req, res) => {
  const projectId = req.params.projectId;

  if (!projectId) {
    return res.status(400).json({ message: "Project id not provided" });
  }

  const dbResponse = await deleteProject(projectId);

  if (dbResponse.success) {
    return res.status(200).json({ message: "Project deleted successfully" });
  } else if (dbResponse.notFound) {
    return res.status(404).json({ message: "Project not found" });
  } else {
    return res.status(500).json({ message: "Could not delete project" });
  }
};

module.exports = { handleProjectDelete };
