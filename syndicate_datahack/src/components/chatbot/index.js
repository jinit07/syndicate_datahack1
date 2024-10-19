import React, { useState } from 'react';
import Bubble from './Bubble'; // Importing the Bubble component

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([
        { text: "Hello! I'm here to help. Please enter your prompt.", sender: 'bot' },
      ]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    console.log('Sending prompt to backend:', input); // Log the input being sent

    try {
      const apiUrl = 'http://localhost:5000/generate-query'; // Hardcoded API URL
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from backend:', data); // Log the generated SQL query

      const sqlQuery = `SELECT * FROM ${data.table_name} WHERE ${data.condition}`;
      setMessages((prevMessages) => [...prevMessages, { text: sqlQuery, sender: 'bot' }]);
    } catch (error) {
      console.error('Error generating SQL query:', error);
      const errorMessage = 'Failed to generate SQL query. Please try again.';
      setMessages((prevMessages) => [...prevMessages, { text: errorMessage, sender: 'bot' }]);
    } finally {
      setIsLoading(false); // Disable input while loading
      setInput(''); // Clear input after sending
    }
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
              disabled={isLoading} // Disable input while loading
            />
            <button onClick={handleSend} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .chatbot-container {
          position: fixed;
          top: 0;
          right: 0;
          width: calc(100% - 16.5rem);
          height: 100vh;
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
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .message-text {
          padding: 10px 15px;
          border-radius: 8px;
          max-width: 70%;
          font-size: 1.2rem;
          color: black;
          background-color: #fff;
        }
        .user .message-text {
          background-color: #d1e7dd;
          color: black;
          align-self: flex-start;
        }
        .bot .message-text {
          background-color: #f8d7da;
          color: black;
          align-self: flex-end;
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
