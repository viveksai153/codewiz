import React, { useState, useEffect } from 'react';
import './ContentModeration.css';
import ContentService from './ContentService'; // Assuming you have a service to handle content-related requests

const ContentModeration = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await ContentService.getContents();
        setContents(response);
      } catch (error) {
        console.error('Failed to fetch contents:', error.message);
      }
    };

    fetchContents();
  }, []);

  const handleRemoveContent = async (contentId) => {
    try {
      await ContentService.removeContent(contentId);
      setContents(contents.filter(content => content._id !== contentId));
    } catch (error) {
      console.error('Failed to remove content:', error.message);
    }
  };

  return (
    <div className="content-moderation admin-section">
      <h2>Content Moderation</h2>
      <ul>
        {contents.map(content => (
          <li key={content._id}>
            {content.title}
            <button onClick={() => handleRemoveContent(content._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentModeration;
