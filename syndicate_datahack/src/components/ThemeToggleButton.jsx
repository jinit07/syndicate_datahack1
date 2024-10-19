import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggleButton = ({ toggleTheme, isDarkMode }) => {
  return (
    <label style={{ cursor: 'pointer' }}>
      <input
        type="checkbox"
        id="darkToggle"
        style={{ display: 'none' }}
        onChange={toggleTheme}
        checked={isDarkMode}
      />
      {isDarkMode ? (
        <FaSun size={24} color="#FFD700" />
      ) : (
        <FaMoon size={24} color="#000" />
      )}
    </label>
  );
};

export default ThemeToggleButton;
