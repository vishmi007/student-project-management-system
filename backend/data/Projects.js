const { db, bucket } = require("../firebase/admin");
const { v4: uuidv4 } = require("uuid");

const PROJECTS_COLLECTION = "Projects";

const createInitialProject = async (projectId, projectData) => {
  if (!projectData || !projectId) return false;

  const snapshot = await db
    .collection(PROJECTS_COLLECTION)
    .doc(projectId)
    .set(projectData);

  return true;
};

const getProjectsByUuid = async (projectOwnerId) => {
  if (!projectOwnerId) return { success: false };

  try {
    const result = await db
      .collection(PROJECTS_COLLECTION)
      .where("projectOwner", "==", projectOwnerId)
      .get();
    const projects = result.docs.map((doc) => {
      return doc.data();
    });
    return { success: true, projects: projects };
  } catch (error) {
    return { success: false };
  }
};

const deleteProject = async (projectId) => {
  if (!projectId) {
    return { success: false, notFound: false };
  }

  try {
    await db
      .collection(PROJECTS_COLLECTION)
      .doc(projectId)
      .delete({ exists: true });
    return { success: true, notFound: false };
  } catch (error) {
    return { success: false, notFound: true };
  }
};

// Adding single submission details to the project
const addSingleSubmissionDetails = async (projectId, singleSubmissionData) => {
  if (!singleSubmissionData || !projectId) return false;

  try {
    const docRef = db.collection(PROJECTS_COLLECTION).doc(projectId);
    const projectRef = await docRef.get();

    if (!projectRef.exists)
      return { status: 404, response: "Project does not exist" };

    await docRef.update({
      singleSubBlueprint: singleSubmissionData,
    });

    return { status: 200, response: singleSubmissionData };
  } catch (error) {
    console.error("Error adding single submission details:", error);
  }
};

// Adding milestone submission details to the existing project
const addMilestoneSubmissionDetails = async (
  projectId,
  milestoneSubmissionArray
) => {
  if (!milestoneSubmissionArray || !projectId) return false;

  try {
    // Update the project with milestone submission details
    await db.collection(PROJECTS_COLLECTION).doc(projectId).update({
      milestoneBlueprint: milestoneSubmissionArray,
    });

    return true;
  } catch (error) {
    console.error("Error adding milestone submission details:", error);
    return false;
  }
};

const setProjectInvite = async (projectId, inviteCode) => {
  if (!projectId) return;
  try {
    const docRef = db.collection(PROJECTS_COLLECTION).doc(projectId);
    const projectRef = await docRef.get();

    if (!projectRef.exists)
      return { status: 404, response: "Project does not exists" };

    const projectData = projectRef.data();
    if (projectData?.inviteCode)
      return {
        status: 409,
        response: "Invite code for the project already exists",
      };

    await docRef.update({ inviteCode });
    return { status: 200, response: inviteCode };
  } catch (error) {
    console.error("Firebase error encountered while adding invite code");
  }
};

//Retrieving the projects that the supervisors are assinged to
const getProjectsForSupervisor = async (supervisorUUID) => {
  try {
    const snapshot = await db
      .collection(PROJECTS_COLLECTION)
      .where("assignedSupervisorList", "array-contains", supervisorUUID)
      .get();

    const projects = [];
    snapshot.forEach((doc) => {
      projects.push(doc.data());
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects for supervisor:", error);
    return [];
  }
};

const getProjectsForEvaluator = async (evaluatorUUID) => {
  try {
    const snapshot = await db
      .collection(PROJECTS_COLLECTION)
      .where("assignedEvaluatorList", "array-contains", evaluatorUUID)
      .get();

    const projects = [];
    snapshot.forEach((doc) => {
      projects.push(doc.data());
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects for evaluator:", error);
    return [];
  }
};

const getProjectsForLecturer = async (lecturerUUID) => {
  try {
    const snapshot = await db
      .collection(PROJECTS_COLLECTION)
      .where("projectOwner", "==", lecturerUUID)
      .get();

    const projects = [];
    snapshot.forEach((doc) => {
      projects.push(doc.data());
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects for lecturer:", error);
    return [];
  }
};

const getProjectTeams = async (projectId) => {
  // from the database check whether its a singe submission or milestone submission
  // if milestone sub get the total number of milestone objects and then put the count
  // this will also be the total to grade
  // singlSubBlueprint -> total to grade and total number of submissions = 1
  // milestoneSubBlueprint
  const teamsData = {};
  try {
    const projectSnapshot = await db
      .collection(PROJECTS_COLLECTION)
      .doc(projectId)
      .get();
    const data = projectSnapshot.data();
    if (data.hasOwnProperty("singleSubBlueprint")) {
      teamsData.submissionType = "singleSubmission";
      teamsData.totalToSubmit = 1;
      teamsData.totalToGrade = 1;
      teamsData.teamSize = data.teamCapacity;

      const teams = data.teams;
      const teamsArray = Object.keys(teams).map((teamId) => {
        const team = teams[teamId];
        const totalEnrolled = team.members.length;
        return {
          teamName: team.teamName,
          teamId: teamId,
          totalEnrolled: totalEnrolled,
          totalSubmitted: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
          totalToGraded: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
        };
      });
      teamsData.teams = teamsArray;
    }

    if (data.hasOwnProperty("milestoneBlueprint")) {
      teamsData.submissionType = "milestoneSubmission";
      teamsData.totalToSubmit = data.milestoneBlueprint.length;
      teamsData.totalToGrade = data.milestoneBlueprint.length;
      teamsData.teamSize = data.teamCapacity;

      const teams = data.teams;
      const teamsArray = Object.keys(teams).map((teamId) => {
        const team = teams[teamId];
        const totalEnrolled = team.members.length;
        return {
          teamName: team.teamName,
          teamId: teamId,
          totalEnrolled: totalEnrolled,
          totalSubmitted: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
          totalToGraded: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
        };
      });
      teamsData.teams = teamsArray;
    }

    return { status: 200, response: teamsData };
  } catch (error) {
    console.error("Error fetching project teams:", error);
    return { status: 500, response: [] };
  }
};

const getProjectList = async () => {
  try {
    console.log("Hit getProject ID datbase call");
    const collectionRef = db.collection(PROJECTS_COLLECTION);
    const querySnapShot = await collectionRef.get();
    const projectList = [];

    querySnapShot.forEach((documentSnapShot) => {
      if (documentSnapShot.data()?.inviteCode) {
        projectList.push(documentSnapShot.data());
      }
    });

    return { success: true, message: projectList };
  } catch (error) {
    console.error("Error searching for project invite codes:", error);
    return { success: false, message: "Eror while reading the project list" };
  }
};

const getProjectByID = async (projectID) => {
  //if there is no project ID given throw an error
  //else iterate over the proejct docs
  //find the resepctive project
  //return the project
  console.log("Hit the getProejctByID database function");
  if (!projectID) {
    return { status: 500, message: "No project ID given " };
  } else {
    try {
      const collectionRef = db.collection("Projects");
      const docuemntref = collectionRef.doc(projectID);
      const projectRef = await docuemntref.get();

      if (projectRef.exists) {
        return { status: 200, message: projectRef.data() };
      } else {
        return { status: 500, message: "No such project" };
      }
    } catch (Error) {
      return {
        status: 500,
        message: "Error occured while gettign the respectiev project",
      };
    }
  }
};

const saveFeedback = async (projectId, studentId, feedbackData) => {
  if (!projectId || !studentId || !feedbackData) {
    return { success: false, message: "Invalid input data" };
  }

  try {
    const docRef = db.collection(PROJECTS_COLLECTION).doc(projectId);
    const projectRef = await docRef.get();

    if (!projectRef.exists) {
      return { success: false, message: "Project does not exist" };
    }

    await docRef.collection("feedback").doc(studentId).set(feedbackData);

    return { success: true, message: "Feedback saved successfully" };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false, message: "Error saving feedback" };
  }
};

const saveGrade = async (projectId, studentId, gradeData) => {
  if (!projectId || !studentId || !gradeData) {
    return { success: false, message: "Invalid input data" };
  }

  try {
    const docRef = db.collection(PROJECTS_COLLECTION).doc(projectId);
    const projectRef = await docRef.get();

    if (!projectRef.exists) {
      return { success: false, message: "Project does not exist" };
    }

    // Assuming you have a structure for saving grades, you can update it here
    await docRef.collection("grades").doc(studentId).set(gradeData);

    return { success: true, message: "Grade saved successfully" };
  } catch (error) {
    console.error("Error saving grade:", error);
    return { success: false, message: "Error saving grade" };
  }
};

const addToTeam = async (uuid, projectID, teamNo) => {
  if ((!uuid, !projectID, !teamNo)) {
    return { status: "400", message: "Error in given data" };
  } else {
    const collectionRef = db.collection("Projects");
    const docuemntref = collectionRef.doc(projectID);
    const projectRef = await docuemntref.get();

    if (projectRef.exists) {
      const theTeamList = projectRef.data().teams;
      const theTeamSize = projectRef.data().teamCapacity;

      for (const team in theTeamList) {
        //checak weather that student is enrolled in atleat one of the avaialble teams - if so make an erro
        const checkList = theTeamList[team].members;
        if (checkList.some((student) => student === uuid)) {
          return { status: 400, message: "Already in a team in this project" };
        }

        if (team === teamNo) {
          const memberList = theTeamList[team].members;
          const isTeamMax = theTeamList[team].isMaxcapacity;

          //member addition part
          if (!isTeamMax) {
            if (memberList[0] === "") {
              //this case is valid in the first place and we are sure that at leat thre will be a one member for a team
              memberList[0] = uuid;
              if (theTeamSize === 1) {
                //maxCapacity will be set if the team size is 1
                theTeamList[team].isMaxcapacity = true;
              }
              await docuemntref.update({ teams: theTeamList });
              return { status: 200, message: theTeamList };
            } else {
              //this is the case where if we have more than one member in a given team

              memberList.push(uuid);
              if (memberList.length >= theTeamSize) {
                theTeamList[team].isMaxcapacity = true;
              }

              await docuemntref.update({ teams: theTeamList });
              return { status: 200, message: theTeamList };
            }
          } else {
            return { status: 400, message: "max-capacity reached" };
          }
        }
      }
    } else {
      return { status: response.status, message: response.message };
    }
  }
};

const addFiles = async (projectId, files, callerId, milestoneName , teamNo) => {
  try {
    console.log("ID: ", callerId);
    console.log("Mielstone name: ", milestoneName);
    if (!projectId || !files) {
      throw new Error("Invalid input data");
    }
    const uploadPromises = [];
    for (const file of files) {
      if (file && file.originalname && file.buffer) {
        const fileId = uuidv4();
        let filePath = ``;
        if (callerId == "project-files") {
          if (milestoneName) {
            filePath = `Lecturer/${projectId}/${milestoneName}/Project-Files/${fileId}/${file.originalname}`;
          } else {
            filePath = `Lecturer/${projectId}/Project-Files/${fileId}/${file.originalname}`;
          }
        } else if (callerId == "rubric") {
          if (milestoneName) {
            filePath = `Lecturer/${projectId}/${milestoneName}/Rubric/${fileId}/${file.originalname}`;
          } else {
            filePath = `Lecturer/${projectId}/Rubric/${fileId}/${file.originalname}`;
          }
        }else if(callerId == "single-submision"){
          console.log("Hit the upload controller");
          filePath = `Students/Submisions/Single_Submision/${projectId}/${teamNo}/${fileId}/${file.originalname}`;
        }else if(callerId == "milestone-submision"){
          filePath = `Students/Submisions/Milestone_Submision/${projectId}/${teamNo}/${milestoneName}/${fileId}/${file.originalname}`;
        }   
        const fileRef = bucket.file(filePath);
        const uploadPromise = fileRef.save(file.buffer, {
          metadata: {
            contentType: file.mimetype,
          },
        });
        uploadPromises.push(uploadPromise);
        await db.collection("files").doc(fileId).set({
          projectId,
          fileName: file.originalname,
          fileSize: file.size,
        });
      } else {
        console.error("Invalid file data:", file);
      }
    }
    await Promise.all(uploadPromises);
    return { success: true, message: "Files uploaded successfully" };
  } catch (error) {
    console.error("Error uploading files:", error);
    return { success: false, message: "Error uploading files" };
  }
};

const getInchargeTeams = async (projectId, userEmail, userRole) => {
  const teamsData = {};
  try {
    const projectSnapshot = await db
      .collection(PROJECTS_COLLECTION)
      .doc(projectId)
      .get();
    const data = projectSnapshot.data();
    if (data.hasOwnProperty("singleSubBlueprint")) {
      teamsData.submissionType = "singleSubmission";
      teamsData.totalToSubmit = 1;
      teamsData.totalToGrade = 1;
      teamsData.teamSize = data.teamCapacity;

      const teams = data.teams;
      const teamsArray = Object.keys(teams).map((teamId) => {
        const team = teams[teamId];
        if (team[userRole].includes(userEmail)) {
          const totalEnrolled = team.members.length;
          return {
            teamName: team.teamName,
            teamId: teamId,
            totalEnrolled: totalEnrolled,
            totalSubmitted: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
            totalToGraded: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
          };
        }
      });
      const filteredTeamsArray = teamsArray.filter((team) => team);
      teamsData.teams = filteredTeamsArray;
    }

    if (data.hasOwnProperty("milestoneBlueprint")) {
      teamsData.submissionType = "milestoneSubmission";
      teamsData.totalToSubmit = data.milestoneBlueprint.length;
      teamsData.totalToGrade = data.milestoneBlueprint.length;
      teamsData.teamSize = data.teamCapacity;

      const teams = data.teams;
      const teamsArray = Object.keys(teams).map((teamId) => {
        const team = teams[teamId];
        if (team[userRole].includes(userEmail)) {
          const totalEnrolled = team.members.length;
          return {
            teamName: team.teamName,
            teamId: teamId,
            totalEnrolled: totalEnrolled,
            totalSubmitted: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
            totalToGraded: 0, // NEED THIS DATA AFTER STUDENT MANGER IS DONE
          };
        }
      });
      const filteredTeamsArray = teamsArray.filter((team) => team);
      teamsData.teams = filteredTeamsArray;
    }

    return { status: 200, response: teamsData };
  } catch (error) {
    console.error("Error fetching project teams:", error);
    return { status: 500, response: [] };
  }
};



module.exports = {
  createInitialProject,
  addSingleSubmissionDetails,
  addMilestoneSubmissionDetails,
  setProjectInvite,
  deleteProject,
  getProjectsForSupervisor,
  getProjectsForLecturer,
  getProjectsByUuid,
  getProjectTeams,
  getProjectList,
  getProjectsForEvaluator,
  getProjectByID,
  saveFeedback,
  saveGrade,
  addToTeam,
  addFiles,
  getInchargeTeams,
};
