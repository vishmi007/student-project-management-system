const express = require("express");
const projectDetailsController = require("../../controllers/create_projects/projectDetailsController");
const singleSubController = require("../../controllers/create_projects/singleSubController");
const milestoneController = require("../../controllers/create_projects/milestoneController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/rolesList");
const credentialsMiddleware = require("../../middleware/credentials");
const verifyJWTMiddleware = require("../../middleware/verifyJWT");
const suggestUsersController = require("../../controllers/create_projects/suggestUsersController");
const projectInviteController = require("../../controllers/create_projects/projectInviteController");
const deleteProjectController = require("../../controllers/create_projects/deleteProjectController");
const projectsController = require("../../controllers/create_projects/projectsController");
const uploadController = require("../../controllers/create_projects/uploadController");
const getTeamsController = require("../../controllers/project_manager/getTeams");

const router = express.Router();

// Apply credentials middleware to allow cookies from allowed origins
router.use(credentialsMiddleware);

// Apply JWT verification middleware for authentication
router.use(verifyJWTMiddleware);

router.get("/projects", projectsController.getProjects);

router.post(
  "/projects/create-project",
  projectDetailsController.storeProjectDetails
);

router.delete(
  "/projects/delete/:projectId",
  deleteProjectController.handleProjectDelete
);

router.get("/projects/search/:role", suggestUsersController.suggestUsers);

router.get(
  "/projects/create-project/complete/:projectId",
  projectInviteController.generateInvite
);

router.post(
  "/projects/create-project/templates/milestone-submission",milestoneController.handleMilestoneSubProjects
);

router.post(
  "/projects/create-project/templates/single-submission", singleSubController.handleSingleSubProjects
);

router.post(
  "/projects/create-project/templates/single-submission/upload", uploadController.handleFileUploadToStorage
);

router.post(
  "/projects/create-project/templates/milestone-submission/upload",uploadController.handleFileUploadToStorage
);

// Viewing all details related to a project
router.get("/projects/:projectid/teams", getTeamsController.getTeams);

router.post("/projects/:projectid/teams/:teamid/feedback", () =>
  console.log("submit feedbak here")
);
router.post("/projects/:projectid/teams/:teamid/submit-grade", () =>
  console.log("submit grade works")
);

module.exports = router;