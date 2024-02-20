const { deleteMessage } = require("../../data/Chats");

const deleteMessageController = async (req, res) => {
  try {
    const { sender, receiver, timestamp } = req.body;

    if (!sender || !receiver || !timestamp) {
      console.log("Error bro");
      console.log("send", sender);
      console.log("re", receiver);
      console.log("timestamp", timestamp);
      return res.status(400).json({ error: "Invalid delete request data" });
    }

    // Delete the chat message
    const messageDeleted = await deleteMessage(sender, receiver, timestamp);

    if (messageDeleted) {
      return res.status(200).json({ message: "Message deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "Message or conversation not found" });
    }
  } catch (error) {
    console.error("Error deleting chat message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteMessageController };
