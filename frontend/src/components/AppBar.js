import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faUser, faCode, faUsers , faBell } from '@fortawesome/free-solid-svg-icons';
import './AppBar.css';

function AppBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location

  const navigateTo = (path) => {
    navigate(path);
  };

  // Function to determine if the current icon matches the active route
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="app-bar">
     
      <FontAwesomeIcon 
        icon={faCode} 
        className={`icon ${isActive('/SnippetManager') ? 'active' : ''}`} 
        onClick={() => navigateTo('/SnippetManager')} 
      />
      <FontAwesomeIcon 
        icon={faClipboardList} 
        className={`icon ${isActive('/SnippetsPage') ? 'active' : ''}`} 
        onClick={() => navigateTo('/SnippetsPage')} 
      />
      <FontAwesomeIcon 
        icon={faUsers} 
        className={`icon ${isActive('/communitypage') ? 'active' : ''}`} 
        onClick={() => navigateTo('/communitypage')} 
      />
      {/* <FontAwesomeIcon 
        icon={faFolderOpen} 
        className={`icon ${isActive('/projects') ? 'active' : ''}`} 
        onClick={() => navigateTo('/projects')} 
      /> */}
      <FontAwesomeIcon 
        icon={faBell} 
        className={`icon ${isActive('/notify') ? 'active' : ''}`} 
        onClick={() => navigateTo('/notify')} 
      />
       <FontAwesomeIcon 
        icon={faUser} 
        className={`icon ${isActive('/Profile') ? 'active' : ''}`} 
        onClick={() => navigateTo('/Profile')} 
      />
    </nav>
  );
}

export default AppBar;
