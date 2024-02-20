// AvailableUsers.js
const express = require("express");
const router = express.Router();
const availableUsersController = require("../controllers/availableUsersController");

router.get("/", availableUsersController.getAvailableUsers);

module.exports = router;
