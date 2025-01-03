import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './memberSidebar.css';

const MemberSidebar = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState('dashboard');

  const handleCommunityPageNavigate = () => {
    navigate('/communitypage');
  };

  const handleNavigation = (path, section) => {
    navigate(path);
    setSelected(section);
  };

  return (
    <aside className="membersidebar">
      <div className="header">
        <button className="circle-button" onClick={handleCommunityPageNavigate}></button>
        <h2>Community</h2>
      </div>
      <hr />
      <ul>
        <li>
          <button
            className={`dashboard-button ${selected === 'dashboard' ? 'selected' : ''}`}
            onClick={() => handleNavigation(`/memberpanel/${communityId}/dashboard`, 'dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            className={`snippets-button ${selected === 'snippets' ? 'selected' : ''}`}
            onClick={() => handleNavigation(`/memberpanel/${communityId}/snippets`, 'snippets')}
          >
            Community Snippets
          </button>
        </li>
        <li>
          <button
            className={`members-button ${selected === 'members' ? 'selected' : ''}`}
            onClick={() => handleNavigation(`/memberpanel/${communityId}/members`, 'members')}
          >
            Community Members
          </button>
        </li>
        <li>
          <button
            className={`messages-button ${selected === 'messages' ? 'selected' : ''}`}
            onClick={() => handleNavigation(`/memberpanel/${communityId}/messages`, 'messages')}
          >
            Messages
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default MemberSidebar;
