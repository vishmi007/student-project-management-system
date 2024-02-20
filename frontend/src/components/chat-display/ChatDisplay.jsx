import React, { useState, useEffect, useRef } from "react";
import "./ChatDisplay.css";
import newimg from "../images/Astronaut.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

function ChatDisplay({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isForwarding, setIsForwarding] = useState(false);
  const [forwardedMessage, setForwardedMessage] = useState(null);
  const [selectedForwardUser, setSelectedForwardUser] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showForwardingContainer, setShowForwardingContainer] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const messageListRef = useRef(null);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "" && selectedUser) {
      const sender = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

      try {
        const response = await axiosPrivate.post("/send-message", {
          sender,
          receiver: selectedUser,
          messageText: newMessage,
          fileData: selectedFile ? await fileToBase64(selectedFile) : null,
        });

        const timestamp = new Date().toISOString();
        const newMessageObj = {
          messageText: newMessage,
          sender,
          receiver: selectedUser,
          timestamp,
          fileData: selectedFile ? URL.createObjectURL(selectedFile) : null,
        };

        setMessages([...messages, newMessageObj]);
        setNewMessage("");
        setSelectedFile(null);

        console.log("Message sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const deleteMessage = async (messageToDelete) => {
    console.log("Message to Delete:", messageToDelete);
    console.log(messageToDelete.sender);
    console.log(messageToDelete.receiver);
    try {
      // Send a request to delete the message to the backend
      // You'll need to implement this route on your server to handle message deletion
      const response = await axiosPrivate.delete(`/delete-message`, {
        data: {
          sender: messageToDelete.sender,
          receiver: messageToDelete.receiver,
          timestamp: messageToDelete.timestamp,
        },
      });

      console.log("Server Response:", response);

      console.log("Message delete request sent:", response);
      // Update the state to remove the deleted message
      setMessages(
        messages.filter(
          (message) => message.timestamp !== messageToDelete.timestamp
        )
      );

      console.log("Message deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const startForwarding = (message) => {
    setForwardedMessage(message);
    setShowForwardingContainer(true);
  };

  const closeForwardingContainer = () => {
    setShowForwardingContainer(false);
    setForwardedMessage(null);
    setSelectedForwardUser(null);
  };

  const forwardMessage = async () => {
    console.log(selectedForwardUser);
    console.log(forwardedMessage);
    if (selectedForwardUser && forwardedMessage) {
      console.log("in the if statement");
      try {
        // Send the message to the backend using axiosPrivate
        const sender = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
        const receiver = selectedForwardUser;

        const response = await axiosPrivate.post("/send-message", {
          sender,
          receiver,
          messageText: forwardedMessage.messageText,
        });

        // Create a valid timestamp in ISO format
        const timestamp = new Date().toISOString();

        // Create a new message object
        const newMessageObj = {
          messageText: forwardedMessage.messageText,
          sender,
          receiver,
          timestamp,
        };

        // Clear the forwarded message and reset the user selection
        setForwardedMessage(null);
        setSelectedForwardUser(null);
        setIsForwarding(false);

        closeForwardingContainer();

        console.log("Message forwarded successfully:", response.data);
      } catch (error) {
        console.error("Error forwarding message:", error);
      }
    }
  };
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const fetchChatMessages = async () => {
    try {
      const senderFullName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
      const response = await axiosPrivate.get(
        `/get-messages/${senderFullName}/${selectedUser}`
      );

      const chatMessages = response.data;
      console.log("Fetched Chat Messages:", chatMessages);
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    setMessages([]);
    setIsForwarding(false);
    setForwardedMessage(null);
    setSelectedForwardUser("");

    async function fetchLoggedInUserInfo() {
      try {
        const response = await axiosPrivate.get("/get-user-info");
        const userInfo = response.data;
        setLoggedInUser(userInfo);
      } catch (error) {
        console.error("Error fetching logged-in user info:", error);
      }
    }

    fetchLoggedInUserInfo();
  }, [selectedUser, axiosPrivate]);

  useEffect(() => {
    fetchChatMessages();
  }, [selectedUser, axiosPrivate]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    async function fetchAvailableUsers() {
      try {
        const response = await axiosPrivate.get("/available-users");
        const data = response.data;
        setAvailableUsers(data); // Set available users in the state
      } catch (error) {
        console.error("Error fetching available users:", error);
      }
    }

    fetchAvailableUsers();
  }, [axiosPrivate]);

  return (
    <div className="chat-system-container">
      <div className="row">
        <div className="col-md-8">
          <div className="chat-display">
            <div className="mb-2">
              <h1>{selectedUser}</h1>
            </div>

            <div className="chat-system-message-list" ref={messageListRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-system-message ${
                    message.sender ===
                    `${loggedInUser?.firstName} ${loggedInUser?.lastName}`
                      ? "chat-system-sent"
                      : "chat-system-received"
                  }`}
                >
                  <p>{message.messageText}</p>
                  {message.fileData && (
                    <img src={message.fileData} alt="Shared File" />
                  )}
                  {message.fileUrl ? (
                    <p>
                      <a
                        href={message.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "darkslategray" }}
                      >
                        Download File
                      </a>
                    </p>
                  ) : null}
                  <p className="timestamp">
                    {new Date(message.timestamp).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </p>
                  <div className="d-flex gap-5">
                    {message.sender ===
                      `${loggedInUser?.firstName} ${loggedInUser?.lastName}` && (
                      <button
                        className="delete-button"
                        onClick={() => deleteMessage(message)}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      className="forward-button"
                      onClick={() => startForwarding(message)}
                    >
                      Forward
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {showForwardingContainer && (
              <div className="forwarding-container">
                {/* Content of the forwarding container */}
                <select
                  value={selectedForwardUser}
                  onChange={(e) => setSelectedForwardUser(e.target.value)}
                  className="users-dropdown"
                >
                  <option value="">
                    Select a user to forward the message to
                  </option>
                  {availableUsers.map((user, index) => (
                    <option key={user.id || index} value={user.fullName}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={forwardMessage}
                  className="forward-button mx-auto mt-3"
                >
                  Forward
                </button>
              </div>
            )}

            <div className="chat-system-message-input">
              <input
                type="text"
                className="chat-system-input"
                placeholder="Type your message..."
                value={newMessage}
                onChange={handleInputChange}
              />

              <label
                className="chat-system-file-input-label"
                htmlFor="file-input"
              >
                <FontAwesomeIcon icon={faPaperclip} size="" />
              </label>
              <input
                type="file"
                id="file-input"
                accept=".jpg, .jpeg, .png, .gif, .bmp, .svg, .pdf, .doc, .docx, .txt, .rtf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <button className="chat-system-button" onClick={sendMessage}>
                Send
              </button>
              {selectedFile && <div>Selected File: {selectedFile.name}</div>}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="chat-system-user-display">
            <img
              src={newimg}
              className="chat-system-user-display-img"
              alt="User profile"
            />
            <div className="mt-2">
              <p className="mt-2">{selectedUser}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatDisplay;
