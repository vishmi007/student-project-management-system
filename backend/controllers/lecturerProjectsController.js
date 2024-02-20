const { getProjectsForLecturer } = require("../data/Projects"); // Import the data abstraction layer function

const getProjectsForLecturerController = async (req, res) => {
  const lecturerUUID = req.uuid; // Use the UUID from the token
  try {
    const projects = await getProjectsForLecturer(lecturerUUID);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects for Lecturer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProjectsForLecturerController };
