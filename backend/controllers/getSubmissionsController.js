const { getSubmissionsForProject } = require("../data/Submissions"); // Import the data abstraction layer function

const getSubmissionsForProjectController = async (req, res) => {
  const { projectName } = req.params; // Get the project name from the URL parameters
  try {
    const submissions = await getSubmissionsForProject(projectName);
   
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions for project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getSubmissionsForProjectController };
