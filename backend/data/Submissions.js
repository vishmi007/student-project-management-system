const { db } = require("../firebase/admin");

const SUBMISSIONS_COLLECTION = "Submissions";

// Retrieving submissions for a specific project
const getSubmissionsForProject = async (projectName) => {
  try {
    const snapshot = await db
      .collection(SUBMISSIONS_COLLECTION)
      .where("nameOfProject", "==", projectName)
      .get();

    const submissions = [];
    snapshot.forEach((doc) => {
      submissions.push(doc.data());
    });

    return submissions;
  } catch (error) {
    console.error("Error fetching submissions for project:", error);
    return [];
  }
};

module.exports = {
  getSubmissionsForProject,
};
