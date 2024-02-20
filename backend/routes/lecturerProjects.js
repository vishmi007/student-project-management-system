const express = require("express");
const router = express.Router();
const lecturerProjectsController = require("../controllers/lecturerProjectsController");

router.get("/", lecturerProjectsController.getProjectsForLecturerController );

module.exports = router;