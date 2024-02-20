const { getProjectsForEvaluator } = require("../data/Projects"); // Import the data abstraction layer function

const getProjectsForEvaluatorController = async (req, res) => {
  const evaluatorEmail = req.params.email;
  try {
    const projects = await getProjectsForEvaluator(evaluatorEmail);
    console.log(projects)
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects for evaluator:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProjectsForEvaluatorController };
