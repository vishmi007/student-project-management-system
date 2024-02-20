const express = require("express");
const {
  getEvaluatorProjects,
} = require("../controllers/project_manager/projectsController");
const {
  getEvaluatorTeams,
} = require("../controllers/project_manager/projectTeams");

const router = express.Router();
router.get("/projects", getEvaluatorProjects);
router.get("/projects/:projectid/teams", getEvaluatorTeams);

module.exports = router;
