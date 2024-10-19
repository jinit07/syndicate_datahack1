import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeToggleButton from './components/ThemeToggleButton';
import Sidebar from './components/Sidebar/Sidebar';
import Chatbot from './components/chatbot'; // Import the chatbot index
import Dashboard from './components/Dashboard'; // Import the Dashboard component

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
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}> {/* Use flex to allow full height */}
        <Sidebar isDarkMode={theme === 'dark'} />
        <div style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}> {/* Allow this div to grow and overflow */}
          <ThemeToggleButton 
            toggleTheme={toggleTheme} 
            isDarkMode={theme === 'dark'} 
            style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }} 
          />
          <Chatbot /> {/* Render the chatbot here */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
