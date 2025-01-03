import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MemberSidebar from './memberpanel/MemberSidebar';

const CommunitySnippets = () => {
  const { communityId } = useParams();
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/community-snippets/community/${communityId}`);
        setSnippets(response.data);
      } catch (error) {
        console.error('Error fetching snippets:', error.message);
      }
    };
    fetchSnippets();
  }, [communityId]);

  return (
    <div className="community-snippets">
      <h1>Community Snippets</h1>
      <MemberSidebar />
      {snippets.length > 0 ? (
        <ul>
          {snippets.map((snippet) => (
            <li key={snippet._id}>
              <h2>{snippet.title}</h2>
              <p>{snippet.language}</p>
              <pre>{snippet.code}</pre>
              <p>Tags: {snippet.tags.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No snippets available</p>
      )}
    </div>
  );
};

export default CommunitySnippets;
