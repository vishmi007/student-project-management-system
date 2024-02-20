const { getConversations } = require("../../data/Chats");

// Controller for retrieving and displaying conversations for the logged-in user
const getConversationsController = async (req, res) => {
  try {
    const { loggedInUser } = req.params;

    if (!loggedInUser) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    // Retrieve and display conversations where the loggedInUser is a participant
    const conversations = await getConversations(loggedInUser);

    return res.status(200).json(conversations);
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getConversationsController };
