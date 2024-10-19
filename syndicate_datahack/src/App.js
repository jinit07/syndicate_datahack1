import React, { useEffect, useState } from 'react';
import ThemeToggleButton from './components/ThemeToggleButton';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  const storageKey = 'theme-preference';

  const getColorPreference = () => {
    return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getColorPreference());

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.firstElementChild.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <Sidebar isDarkMode={theme === 'dark'} />
      <ThemeToggleButton 
        toggleTheme={toggleTheme} 
        isDarkMode={theme === 'dark'} 
        style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }} // Adjusted to top right
      />
      <div style={{ marginLeft: '14rem', padding: '2rem' }}>
        {/* Other components go here */}
      </div>
    </div>
  );
};

export default App;
