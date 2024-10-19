// src/components/chatbot/index.js
import React, { useState } from 'react';
import BubbleIcon from './Bubble';

const Chatbot = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleBubbleClick = () => {
    setIsChatVisible((prev) => !prev); // Toggle chatbot visibility
  };

  return (
    <div>
      <BubbleIcon onClick={handleBubbleClick} />
      {isChatVisible && (
        <div style={{ 
          position: 'fixed', 
          bottom: '80px', 
          right: '10px', 
          backgroundColor: 'white', 
          padding: '1rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)', 
          width: '300px' 
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Chatbot</h3>
          <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
            {/* Simple chat log */}
            <div>User: Hello!</div>
            <div>Chatbot: Hi there! How can I help you today?</div>
          </div>
          <input type="text" placeholder="Type a message..." style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
