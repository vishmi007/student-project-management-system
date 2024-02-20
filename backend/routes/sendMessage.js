const express = require("express");
const router = express.Router();
const { sendMessageController } = require("../controllers/chat_system/sendMessageController");

// Route for sending chat messages
router.post("/", sendMessageController);

module.exports = router;
