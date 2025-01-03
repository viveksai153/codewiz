import React from 'react';
import './SnippetCard.css';  // Import CSS file for styling

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Import SyntaxHighlighter component
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import Prism style for syntax highlighting

const SnippetCard = ({ snippet, onViewMore }) => {
  // Helper function to format tags array into a string
  const formatTags = tags => tags.join(', ');

  // Handler for clicking "View More" button
  const handleViewMoreClick = () => {
    onViewMore(snippet.id); // Pass snippet id to parent component
    console.log(snippet.id); // Log snippet id to console
  };

  return (
    <div className="snippet-card">
      <h3 className='title'>{snippet.title}</h3>
      {/* Display snippet description if available, otherwise display tags */}
      <p className='tagss'>{snippet.description || `Tags: ${formatTags(snippet.tags)}`}</p>
      {/* Syntax highlighting for code using SyntaxHighlighter */}
      <SyntaxHighlighter language={snippet.language} style={tomorrow} className='code'>
         
        {snippet.code.split('\n').slice(0, 5).join('\n')}
        {snippet.code.split('\n').length > 5 && '...'}
      </SyntaxHighlighter>
      {/* "View More" button */}
      <button className='viewmore-btn' onClick={handleViewMoreClick}>View More</button>
      {/* Placeholder for "preview" button */}
      {/* <button className='preview-btn'>Preview</button> */}
    </div>
  );
};

export default SnippetCard;
