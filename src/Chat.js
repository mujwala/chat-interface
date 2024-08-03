import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Paper, Typography, Box } from '@mui/material';

// Sample dummy messages to simulate a chat conversation
const dummyMessages = [
  '**Hello!** How can I assist you today?',
  'I am looking for information on your products.',
  '**Sure!** We have a wide range of products. What are you interested in?',
  'Can you tell me more about your latest product?',
  '**Absolutely!** Our latest product is a state-of-the-art gadget that...',
];

const Chat = () => {
  // State to keep track of the list of messages
  const [messages, setMessages] = useState([]);
  // State to keep track of the current message index
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Function to simulate adding new messages to the chat
    const simulateChat = () => {
      if (index < dummyMessages.length) {
        // Create a new message object with alternating user and system message types
        const newMessage = {
          text: dummyMessages[index],
          isUser: index % 2 === 0 // Alternate between user (true) and system (false) messages
        };
        // Add the new message to the list of messages
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // Move to the next message index
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    // Set up an interval to call simulateChat every 3 seconds
    const intervalId = setInterval(simulateChat, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [index]); // Dependency array includes `index` to re-run effect when index changes

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Box sx={{ flex: 1, overflowY: 'scroll', border: '1px solid #ccc', padding: 2 }}>
        {/* Render the list of messages */}
        {messages.map((msg, index) => (
          <Box key={index} sx={{ marginBottom: 2, textAlign: msg.isUser ? 'right' : 'left' }}>
            {/* Display each message in a Paper component with conditional background color */}
            <Paper sx={{ padding: 2, backgroundColor: msg.isUser ? '#d1e7dd' : '#e9ecef' }}>
              <Typography>
                {/* Render markdown content of the message */}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Chat;
