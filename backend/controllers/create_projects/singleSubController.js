const { addSingleSubmissionDetails } = require("../../data/Projects");

const handleSingleSubProjects = async (req, res) => {
  const projectId = req.body.projectId;
  
    const {
      submissionName,
      projectDeadline,
      totalMarks,
      passMark,
      projectDescription,
      //selectedFileNames,
    } = req.body;

  
    if (!projectId || !submissionName || !projectDeadline || !totalMarks || !passMark || !projectDescription) {
        return res.status(400).json({ message: "Missing required fields." });
      }

    try {
        const singleSubBlueprint = {
            submissionName,
            projectDeadline,
            totalMarks,
            passMark,
            projectDescription,
            //selectedFileNames,
          };

          const updated = await addSingleSubmissionDetails(projectId, singleSubBlueprint);

          if (!updated) return res.sendStaus(500);
          res.sendStatus(200);

    } catch (error) {
      console.error("Error adding single submission details:", error);
      return res.sendStatus(500);
    }
  };
  
  module.exports = {
    handleSingleSubProjects,
  };