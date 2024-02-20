const { db, admin } = require("../firebase/admin");
// Function to store a chat message
const storeChatMessage = async (sender, receiver, messageText,fileUrl) => {
  try {
    // Create a timestamp for the current date and time
    const timestamp = new Date().toISOString();

    // Create an object representing the chat message
    const message = {
      sender,
      receiver,
      messageText,
      timestamp,
      fileUrl,
    };

    // Check if a conversation document exists for the sender and receiver
    const conversationRef1 = db
      .collection("chatConversations")
      .where("participants", "array-contains", sender);
    const conversationRef2 = db
      .collection("chatConversations")
      .where("participants", "array-contains", receiver);

    const [conversationQuerySnapshot1, conversationQuerySnapshot2] =
      await Promise.all([conversationRef1.get(), conversationRef2.get()]);

    let conversationId;

    conversationQuerySnapshot1.forEach((doc1) => {
      const conversationId1 = doc1.id;
      conversationQuerySnapshot2.forEach((doc2) => {
        if (doc2.id === conversationId1) {
          conversationId = doc2.id;
        }
      });
    });

    if (!conversationId) {
      // If no conversation exists for sender and receiver, create a new conversation document
      const newConversation = {
        participants: [sender, receiver],
        messages: [message],
      };

      const newConversationRef = await db
        .collection("chatConversations")
        .add(newConversation);
      conversationId = newConversationRef.id;
    } else {
      // If a conversation already exists for sender and receiver, simply add the message
      await db
        .collection("chatConversations")
        .doc(conversationId)
        .update({
          messages: admin.firestore.FieldValue.arrayUnion(message),
        });
    }

    return conversationId; // Return the ID of the conversation/document
  } catch (error) {
    console.error("Error storing chat message:", error);
    throw error;
  }
};

// Function to retrieve chat messages between two users
const getChatMessages = async (sender, receiver) => {
  try {
    // Check if a conversation document exists for sender
    const conversationRef1 = db
      .collection("chatConversations")
      .where("participants", "array-contains", sender);

    // Check if a conversation document exists for receiver
    const conversationRef2 = db
      .collection("chatConversations")
      .where("participants", "array-contains", receiver);

    const [conversationQuerySnapshot1, conversationQuerySnapshot2] =
      await Promise.all([conversationRef1.get(), conversationRef2.get()]);

    let messages = [];

    for (const doc1 of conversationQuerySnapshot1.docs) {
      for (const doc2 of conversationQuerySnapshot2.docs) {
        if (doc1.id === doc2.id) {
          // If a conversation document exists for both sender and receiver, retrieve and return the messages
          const conversationData = doc1.data();
          const messagesWithFiles = conversationData.messages.map((message) => ({
            ...message,
            // If there's a file in the message, include its information
            file: message.fileUrl ? { url: message.fileUrl } : null,
          }));
          messages = messagesWithFiles;
          console.log(messages);
        }
      }
    }

    return messages;
  } catch (error) {
    console.error("Error retrieving chat messages:", error);
    throw error;
  }
};


// Function to retrieve conversations where the logged-in user is a participant
const getConversations = async (loggedInUser) => {
  try {
    // Check if there are any conversations where the loggedInUser is a participant
    const conversationsRef = db
      .collection("chatConversations")
      .where("participants", "array-contains", loggedInUser);
    const conversationQuerySnapshot = await conversationsRef.get();

    let conversations = [];

    conversationQuerySnapshot.forEach((doc) => {
      const conversationData = doc.data();
      const otherParticipant = conversationData.participants.find(
        (participant) => participant !== loggedInUser
      );

      // Get the last message in the conversation
      const lastMessage =
        conversationData.messages[conversationData.messages.length - 1];

      // Create an object with the other participant's name, the last message, and its timestamp
      const conversationInfo = {
        otherParticipant,
        lastMessageText: lastMessage.messageText,
        lastMessageTimestamp: lastMessage.timestamp,
      };

      conversations.push(conversationInfo);
    });

    // Sort conversations by the timestamp of the last message (latest first)
    conversations.sort((a, b) =>
      b.lastMessageTimestamp.localeCompare(a.lastMessageTimestamp)
    );

    return conversations;
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    throw error;
  }
};

const deleteMessage = async (sender, receiver, messageTimestamp) => {
  try {
    console.log("Deleting message...");
    console.log("Sender:", sender);
    console.log("Receiver:", receiver);
    console.log("Message Timestamp:", messageTimestamp);
    // Find the conversation that includes both sender and receiver
    const conversationQuerySnapshot = await db
      .collection("chatConversations")
      .where("participants", "array-contains", sender)
      .get();

    let conversationId;

    conversationQuerySnapshot.forEach((doc) => {
      const participants = doc.data().participants;
      if (participants.includes(receiver)) {
        conversationId = doc.id;
      }
    });

    if (conversationId) {
      // Get a reference to the conversation document
      const conversationRef = db
        .collection("chatConversations")
        .doc(conversationId);

      // Retrieve the conversation data
      const conversationDoc = await conversationRef.get();

      if (conversationDoc.exists) {
        const conversationData = conversationDoc.data();

        // Find the index of the message with the provided timestamp in the messages array
        const messageIndex = conversationData.messages.findIndex(
          (message) => message.timestamp === messageTimestamp
        );

        if (messageIndex !== -1) {
          console.log("Message found and will be deleted");
          // Remove the message from the messages array
          conversationData.messages.splice(messageIndex, 1);

          // Update the conversation document with the modified messages array
          await conversationRef.update({ messages: conversationData.messages });
          console.log("Message deleted successfully");
          return true; // Message deleted successfully
        }
      }
    }

    return false; // Message or conversation not found
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

module.exports = {
  storeChatMessage,
  getChatMessages,
  getConversations,
  deleteMessage,
};
