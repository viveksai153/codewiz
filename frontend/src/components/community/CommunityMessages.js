import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import MemberPanel from './memberpanel/MemberPanel';
import fetchUserData from '../util/fetchuserdata';

const socket = io('http://localhost:5000');

const CommunityMessages = () => {
  const { communityId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        localStorage.setItem('userId', userData); // Save userId in localStorage
      }
    };

    fetchData();

    socket.emit('joinRoom', communityId);

    fetchMessages();

    socket.on('newMessage', (message) => {
      if (message.communityId === communityId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    
  },);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${communityId}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setMessages(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
         await fetch('http://localhost:5000/api/messages/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({
            communityId,
            content: newMessage,
          }),
        });

        // const data = await response.json();
        setNewMessage('');
        fetchMessages(); // Fetch messages again after sending a new message
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  return (
    <div className="community-messages">
      <MemberPanel />
      <h1>Community Messages</h1>
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id} // Ensure each message has a unique key
              className={`message ${message.userId === localStorage.getItem('userId') || (message.userId && message.userId._id) === localStorage.getItem('userId') ? 'sent' : 'received'}`}
            >
              <p><strong>{message.userId.name || message.userName}:</strong> {message.content}</p>
              <small>{new Date(message.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default CommunityMessages;
