// src/components/chatbot/BubbleIcon.js
import React from 'react';

const BubbleIcon = ({ onClick }) => {
  const bubbleImage = `${process.env.PUBLIC_URL}/Bot-icon-1.png`; // Correct path for the image

  const styles = {
    bubble: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'rgba(173, 216, 230, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      zIndex: 1000,
      cursor: 'pointer',
    },
    image: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    },
  };

  return (
    <div style={styles.bubble} onClick={onClick}>
      <img src={bubbleImage} alt="Chatbot" style={styles.image} />
    </div>
  );
};

export default BubbleIcon;
