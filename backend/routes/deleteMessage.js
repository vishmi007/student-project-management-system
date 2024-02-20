const express = require("express");
const router = express.Router();
const {
  deleteMessageController,
} = require("../controllers/chat_system/deleteMessageController");

// Route for deleting a chat message with parameters
router.delete("/", deleteMessageController);

module.exports = router;
