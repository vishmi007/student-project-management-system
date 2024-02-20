const { getChatMessages } = require("../../data/Chats");
const { admin } = require("../../firebase/admin"); 

// Controller for retrieving and displaying chat messages with parameters
const getChatMessagesController = async (req, res) => {
  try {
    const { sender, receiver } = req.params;

    if (!sender || !receiver) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    // Retrieve and display chat messages
    const messages = await getChatMessages(sender, receiver);

    // If there are messages with file URLs, generate signed URLs for the files
    const messagesWithFileUrls = await Promise.all(
      messages.map(async (message) => {
        if (message.fileUrl) {
          try {
            const file = admin.storage().bucket().file(message.fileUrl);
    
            // Generate a signed URL with a short expiration time (e.g., 1 hour)
            const [signedUrl] = await file.getSignedUrl({
              action: "read",
              expires: Date.now() + 60 * 60 * 1000, // 1 hour in milliseconds
            });
    
            return { ...message, fileUrl: signedUrl };
          } catch (error) {
            console.error("Error generating signed URL for file:", error);
          }
        }
    
        return message;
      })
    );
    
    return res.status(200).json(messagesWithFileUrls);
  } catch (error) {
    console.error("Error retrieving chat messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getChatMessagesController };
