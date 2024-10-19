import React from 'react';

const Bubble = ({ onClick }) => {
  const bubbleImage = `${process.env.PUBLIC_URL}/Boy-icon-2.png`; // Correct path for the image

  const styles = {
    image: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      zIndex: 1000,
      cursor: 'pointer',
    },
  };

  return (
    <img
      src={bubbleImage}
      alt="Chatbot"
      style={styles.image}
      onClick={onClick}
    />
  );
};

export default Bubble;
