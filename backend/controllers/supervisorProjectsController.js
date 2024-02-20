const { getProjectsForSupervisor } = require("../data/Projects"); // Import the data abstraction layer function

const getProjectsForSupervisorController = async (req, res) => {
  const supervisorEmail= req.params.email; // Use the email from the parameter passed
  try {
    const projects = await getProjectsForSupervisor(supervisorEmail);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects for supervisor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProjectsForSupervisorController };
