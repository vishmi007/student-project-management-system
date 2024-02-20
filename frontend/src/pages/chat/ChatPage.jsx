import React, { useState } from "react";
import ChatDisplay from "../../components/chat-display/ChatDisplay";
import MessageList from "../../components/message-list/MessageList";
import "./ChatPage.css"

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(""); // State to store the selected user's name

  return (
    <div>
      <h1>Messages</h1>
      <hr className="chat-page-divider" />
      <div className="row">
        <div className="col-md-4">
          <MessageList setSelectedUser={setSelectedUser} /> {/* Pass setSelectedUser as a prop */}
        </div>
        <div className="col-md-4">
          <ChatDisplay selectedUser={selectedUser} /> {/* Pass selectedUser as a prop */}
        </div>
      </div>
    </div>
  );
}
