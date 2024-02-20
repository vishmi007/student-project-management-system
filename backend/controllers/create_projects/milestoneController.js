const { addMilestoneSubmissionDetails } = require("../../data/Projects");

const handleMilestoneSubProjects = async (req, res) => {
  //console.log(req.body);  
  const {
    projectId,
    milestoneSubmissions, 
  } = req.body;

  for (const milestone of milestoneSubmissions) {
    const { submissionName, projectDeadline, totalMarks, passMark, projectDescription } = milestone;
    // Check if projectId is missing
    if (!projectId) {
      console.log("projectId is missing.");
      return res.status(400).json({ message: "Missing projectId." });
    }

    // Check if milestoneSubmissions is missing or not an array
    if (!milestoneSubmissions || !Array.isArray(milestoneSubmissions)) {
      console.log("milestoneSubmissions is missing or not an array.");
      return res.status(400).json({ message: "Invalid or missing milestoneSubmissions." });
    }
  }

 

  try {
    const milestoneBlueprintArray = milestoneSubmissions.map((milestone) => {
      const {
        submissionName,
        projectDeadline,
        totalMarks,
        passMark,
        projectDescription,
        //selectedFileNames,
      } = milestone;

      return {
        submissionName,
        projectDeadline,
        totalMarks,
        passMark,
        projectDescription,
        //selectedFileNames,
      };
    });

    // Update the project with milestone submission details
    const updated = await addMilestoneSubmissionDetails(projectId, milestoneBlueprintArray);
    if (updated) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    console.error("Error adding milestone submission details:", error);
    return res.sendStatus(500);
  }
};

module.exports = {
  handleMilestoneSubProjects,
};