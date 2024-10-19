import React from 'react';

const Sidebar = ({ isDarkMode }) => {
  const styles = {
    sideBar: {
      width: '23.2rem',
      height: '100%',
      padding: '2.1rem 1.2rem',
      backgroundColor: isDarkMode ? '#17171e' : '#f8f9fa', // Dark or light background
      position: 'fixed',
      transition: 'all 0.5s ease',
      top: 0,
      color: isDarkMode ? '#FFD700' : '#333', // Text color changes based on theme
    },
    logoNameWrapper: {
      marginBottom: '2.1rem',
      display: 'flex',
      fontSize: '1.5rem', // Increased font size
      alignItems: 'center',
    },
    logoName: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '50px', // Adjust logo size
      height: 'auto',
    },
    logoNameText: {
      marginLeft: '0.9rem',
      whiteSpace: 'nowrap',
      fontWeight: 'bold', // Make text bold
      color: isDarkMode ? '#FFD700' : '#333', // Shiny gold or dark text
    },
    logoNameButton: {
      marginLeft: 'auto',
      fontSize: '1.8rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    dashboardItem: {
      padding: '1rem 0',
      fontSize: '1.5rem', // Increased font size
      cursor: 'pointer',
      color: isDarkMode ? '#b5b5be' : '#666', // Change color based on theme
    },
  };

  const handleSidebarToggle = () => {
    const sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('collapse');
  };

  return (
    <div className="side-bar" style={styles.sideBar} onClick={handleSidebarToggle}>
      <div style={styles.logoNameWrapper}>
        <div style={styles.logoName}>
          <img
            src={`${process.env.PUBLIC_URL}/Syndicate Logo.png`} // Use this if logo is in public folder
            style={styles.logo}
            alt="logo app"
          />
          <span style={styles.logoNameText}>Syndicate</span>
        </div>
        <button style={styles.logoNameButton}>
          <i className="bx bx-arrow-from-right logo-name__icon" id="logo-name__icon"></i>
        </button>
      </div>

      <div style={styles.dashboardItem}>
        <i className="bx bxs-dashboard"></i>
        <span style={{ marginLeft: '0.5rem' }}>Dashboard</span>
      </div>
    </div>
  );
};

export default Sidebar;
