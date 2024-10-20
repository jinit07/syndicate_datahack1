import React from 'react';

const Bubble = ({ onClick }) => {
  const bubbleImage = `${process.env.PUBLIC_URL}/Boy-icon-2.png`; // Correct path for the image
  const styles = {
    bubble: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 1000,
      cursor: 'pointer',
    },
    image: {
      width: '80px', // Adjusted to fill the bubble area
      height: '80px', // Adjusted to fill the bubble area
      borderRadius: '50%',
    },
  };
  
  return (
    <div style={styles.bubble} onClick={onClick}>
      <img src={bubbleImage} alt="Chatbot" style={styles.image} />
    </div>
  );
};

export default Bubble;
