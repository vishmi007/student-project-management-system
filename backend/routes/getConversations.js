const express = require("express");
const router = express.Router();
const { getConversationsController } = require("../controllers/chat_system/getConversationsController");

// Route for retrieving conversations for the logged-in user
router.get("/:loggedInUser", getConversationsController);

module.exports = router;
