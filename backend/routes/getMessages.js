const express = require("express");
const router = express.Router();
const { getChatMessagesController } = require("../controllers/chat_system/getChatMessagesController");

// Route for retrieving and displaying chat messages with parameters
router.get("/:sender/:receiver", getChatMessagesController);


module.exports = router;
