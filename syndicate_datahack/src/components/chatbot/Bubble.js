import React from 'react';

const Bubble = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    }}>
      💬
    </div>
  );
};

export default Bubble;
