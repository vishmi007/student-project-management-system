const { storeChatMessage } = require("../../data/Chats");
const { admin } = require("../../firebase/admin");

// Controller for sending chat messages with file upload
const sendMessageController = async (req, res) => {
  try {
    const { sender, receiver, messageText, fileData } = req.body;

    if (!sender || !receiver) {
      return res.status(400).json({ error: "Invalid message data" });
    }

    if (fileData) {
      const bucket = admin.storage().bucket();
      const folder = 'chat_files'; // Specify the folder name
      // Generate a unique file name within the folder
      const fileName = `${folder}/${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const file = bucket.file(fileName);
      const fileStream = file.createWriteStream({
        metadata: {
          contentType: fileData.type,
        },
      });

      fileStream.on("error", (error) => {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Internal server error" });
      });

      fileStream.on("finish", async () => {
        const fileUrl = `${bucket.name}/${fileName}`;

        // Store the chat message with the file URL
        await storeAndRespond(sender, receiver, messageText, fileUrl, res);
      });

      // Decode the Base64 data and write it to the storage stream
      const decodedFileData = Buffer.from(fileData, 'base64');
      fileStream.end(decodedFileData);
    } else {
      // Store the chat message without file data
      await storeAndRespond(sender, receiver, messageText, null, res);
    }
  } catch (error) {
    console.error("Error sending chat message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to store the chat message and send the response
const storeAndRespond = async (sender, receiver, messageText, fileUrl, res) => {
  const messageId = await storeChatMessage(sender, receiver, messageText, fileUrl);
  res.status(201).json({ messageId, fileUrl });
};

module.exports = { sendMessageController };
