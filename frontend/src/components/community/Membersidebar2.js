import React from 'react';
import './communitydashboard.css';

const Membersidebar2 = ({ snippets, onSnippetClick, onCreateSnippet }) => {
  console.log('Received snippets:', snippets); // Log the received snippets

  return (
    <div className="membersidebar2">
      <h2>Snippets</h2>
      <button onClick={onCreateSnippet}>Create Snippet</button>
      {snippets.length === 0 ? (
        <p>No snippets available</p>
      ) : (
        <ul>
          {snippets.map(snippet => (
            <li key={snippet._id} onClick={() => onSnippetClick(snippet._id)}>
              {snippet.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Membersidebar2;
