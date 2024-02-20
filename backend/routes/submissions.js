const express = require("express");
const router = express.Router();
const submissionsController = require("../controllers/getSubmissionsController");

// GET submissions for a specific project
router.get("/:projectName", submissionsController.getSubmissionsForProjectController);

module.exports = router;
