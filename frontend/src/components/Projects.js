import React from 'react';
import AppBar from './AppBar';

function Projects() {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    marginTop: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.5rem',
    color: '#666',
  };

  return (
    <> 
    <AppBar />
    <div style={containerStyle}>
      
      <h1 style={titleStyle}>Project</h1>
      <p style={paragraphStyle}>Coming Soon</p>
    </div>
    </>
  );
}

export default Projects;
