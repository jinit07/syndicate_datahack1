// src/components/chatbot/index.js
import React, { useState } from 'react';
import BubbleIcon from './BubbleIcon';

const Chatbot = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'Syndicate';

  const handleBubbleClick = () => {
    setIsAnimating(true);
    setText(''); // Reset text each time
    moveBubble(); // Start moving the bubble
    typeText(); // Start typing text
  };

  const moveBubble = () => {
    const bubble = document.getElementById('bubble');
    if (bubble) {
      bubble.style.transition = 'transform 1s ease';
      bubble.style.transform = 'translate(-50vw, -50vh)'; // Move to center
    }
  };

  const typeText = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500); // Adjust typing speed here
  };

  return (
    <div>
      <div id="bubble" style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <BubbleIcon onClick={handleBubbleClick} />
      </div>
      {isAnimating && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
