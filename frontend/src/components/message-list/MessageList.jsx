import React, { useState, useEffect } from 'react';
import './MessageList.css'; // Make sure to update the CSS file import
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import newimg from '../images/Astronaut.png';

const ROLES_LIST = {
  4356: 'Lecturer',
  8080: 'Supervisor',
  7787: 'Evaluator',
  2990: 'Student',
};

function MessageList({ setSelectedUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userConversations, setUserConversations] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]); // State to store available users

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchAvailableUsers() {
      try {
        const response = await axiosPrivate.get("/available-users");
        const data = response.data;
        setAvailableUsers(data); // Set available users in the state
      } catch (error) {
        console.error('Error fetching available users:', error);
      }
    }

    fetchAvailableUsers();
  }, [axiosPrivate]);

  useEffect(() => {
    async function fetchLoggedInUserInfo() {
      try {
        const response = await axiosPrivate.get("/get-user-info");
        const userInfo = response.data;
        setLoggedInUser(userInfo);
      } catch (error) {
        console.error('Error fetching logged-in user info:', error);
      }
    }

    fetchLoggedInUserInfo();
  }, [axiosPrivate]);

  useEffect(() => {
    async function fetchUserConversations() {
      try {
        if (loggedInUser) {
          const senderFullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
          const response = await axiosPrivate.get(`/get-conversations/${senderFullName}`);
          const conversations = response.data;
          setUserConversations(conversations);
        }
      } catch (error) {
        console.error('Error fetching user conversations:', error);
      }
    }

    fetchUserConversations();
  }, [axiosPrivate, loggedInUser]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  // Filter conversations based on the search query
  const filteredConversations = userConversations.filter((conversation) =>
    conversation.otherParticipant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter available users based on the search query and exclude users who have had conversations
  const filteredAvailableUsers = availableUsers.filter((user) =>
    !userConversations.some((conversation) => conversation.otherParticipant === user.fullName) &&
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="messages-list"> 
      <div className="search-input-container">
        <input
          className="message-list-search-input" 
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div>
        <ul className="list">
          {filteredConversations.map((conversation, index) => (
            <li
              key={index}
              className={`message-list-messages`} 
              onClick={() => handleUserSelect(conversation.otherParticipant)}
            >
              <div className="message-list-user-info"> 
                <div className="message-list-profile-pic"> 
                  <img src={newimg} className="message-list-profile-pic-img" alt="User profile" />  
                </div>
                <span className="message-list-sender-name">{conversation.otherParticipant}</span> 
              </div>
              <div className="message-list-last-message-info"> 
                <span className="message-list-last-message">{conversation.lastMessageText}</span> 
                <span className="message-list-timestamp"> 
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  }).format(new Date(conversation.lastMessageTimestamp))}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>People you may know</h3>
        <ul className="list">
          {filteredAvailableUsers.map((user, index) => (
            <li
              key={index}
              className={`message-list-messages`} 
              onClick={() => handleUserSelect(user.fullName)}
            >
              <div className="message-list-user-info"> 
                <div className="message-list-profile-pic"> 
                  <img src={newimg} className="message-list-profile-pic-img" alt="User profile" /> 
                </div>
                <span className="message-list-sender-name">{user.fullName}</span> 
              </div>
              <span className="message-list-role">{ROLES_LIST[user.role]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageList;
