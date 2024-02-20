const express = require("express");
const {
  getSupervisorProjects,
} = require("../controllers/project_manager/projectsController");
const {
  getSupervisorTeams,
} = require("../controllers/project_manager/projectTeams");

const router = express.Router();
router.get("/projects", getSupervisorProjects);
router.get("/projects/:projectid/teams", getSupervisorTeams);

module.exports = router;
