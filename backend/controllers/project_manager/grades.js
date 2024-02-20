const { saveGrade } = require("../../services/project_manager/grades");

async function saveGradeController(req, res) {
  try {
    // Extract data from the request body
    const { projectId, studentId, grades } = req.body;

    // Call the saveGrade function to save the grade
    const result = await saveGrade(projectId, studentId, grades);

    if (result.success) {
      // Respond with a success message or the result from the saveGrade function
      res.status(201).json({ message: result.message });
    } else {
      // Handle the case where saving the grade failed
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    // Handle other errors appropriately and send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
}
