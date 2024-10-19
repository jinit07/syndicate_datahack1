import React, { useEffect, useState } from 'react';
import ThemeToggleButton from './components/ThemeToggleButton';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme-preference') === 'dark';
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme-preference', newTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark', newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <Sidebar isDarkMode={isDarkMode} /> {/* Pass the theme state here */}
      <div style={{ marginLeft: '23.2rem', padding: '2rem' }}>
        <ThemeToggleButton toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        {/* Other components go here */}
      </div>
    </div>
  );
};

export default App;
