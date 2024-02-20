const express = require("express");
const router = express.Router();
const supervisorProjectsController = require("../controllers/supervisorProjectsController");

router.get("/:email", supervisorProjectsController.getProjectsForSupervisorController);

module.exports = router;