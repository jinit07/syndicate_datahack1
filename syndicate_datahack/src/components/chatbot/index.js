import React, { useState } from 'react';
import Bubble from './Bubble'; // Importing the Bubble component

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generate-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();

      const botMessage = { text: data.query, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error generating SQL query:', error);
    }

    setInput(''); // Clear the input field
  };

  return (
    <div>
      <Bubble onClick={handleToggle} />
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <img
                  src={msg.sender === 'user' ? `${process.env.PUBLIC_URL}/User-icon.png` : `${process.env.PUBLIC_URL}/Boy-icon-2.png`}
                  alt={msg.sender}
                  className="message-icon"
                />
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .chatbot-container {
          position: fixed;
          top: 0; /* Start from the top */
          right: 0; /* Align to the right */
          width: calc(100% - 14rem); /* Full width minus sidebar width */
          height: 100vh; /* Full height */
          background: var(--bg-color);
          border-left: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        }
        .chatbot-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
          margin-bottom: 10px;
        }
        .message {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .message-icon {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .message-text {
          padding: 5px 10px;
          border-radius: 5px;
          max-width: 70%; /* Limit the message width */
        }
        .user .message-text {
          background-color: #d1e7dd; /* User message background */
          color: #0f5132; /* User message text color */
          align-self: flex-end; /* Align user messages to the right */
        }
        .bot .message-text {
          background-color: #f8d7da; /* Bot message background */
          color: #721c24; /* Bot message text color */
          align-self: flex-start; /* Align bot messages to the left */
        }
        .input-container {
          display: flex;
          margin-top: 10px;
        }
        input {
          flex-grow: 1;
          padding: 5px;
          margin-right: 5px;
        }
        button {
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
