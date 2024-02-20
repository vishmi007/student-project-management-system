const express = require("express");
const router = express.Router();
const evaluatorProjectsController = require("../controllers/evaluatorProjectsController");

router.get("/:email", evaluatorProjectsController.getProjectsForEvaluatorController);

module.exports = router;