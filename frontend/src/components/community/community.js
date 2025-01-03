import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityService from './CommunityService';
import './community.css';
import AppBar from '../AppBar';
import fetchUserData from '../util/fetchuserdata';

const Community = () => {
  const [createdCommunities, setCreatedCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(''); // State to store the user ID
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user ID
    const fetchUserId = async () => {
      const id = await fetchUserData();
      setUserId(id);
    };

    fetchUserId();

    // Fetch role from local storage
    const storedRole = localStorage.getItem('role');
    setRole(storedRole || '');

    const fetchUserCommunities = async () => {
      try {
        const communities = await CommunityService.getUserCommunities();
        
        const created = communities.filter(community => 
          community.members.some(member => member.user._id === userId && member.role === 'administrator')
        );
        const joined = communities.filter(community => 
          community.members.some(member => member.user._id === userId && member.role === 'member')
        );
        console.log(userId);
    
        setCreatedCommunities(created);
        setJoinedCommunities(joined);
      } catch (error) {
        console.error(error.message);
      }
    };
    

    fetchUserCommunities();
  }, [userId]); // Add userId as a dependency

  const handleCommunityClick = (community, isCreated) => {
    if (isCreated || role === 'administrator') {
      navigate(`/adminpanel/${community._id}`, { state: { community } });
    } else {
      navigate(`/memberpanel/${community._id}`, { state: { community } });
    }
  };

  const handleCreateCommunity = async () => {
    navigate('/createcommunity');
  };

  const handleJoinCommunity = async () => {
     navigate('/joincommunity');
  };

  return (
    <>
      <AppBar />
      <div className="community-navbar">
        <button onClick={handleCreateCommunity}>Create Community</button>
        <button onClick={handleJoinCommunity}>Join Community</button>
      </div>
      <div className="community-container">
        {createdCommunities.length > 0 && (
          <div className="card created-communities">
            <h2>Created Communities</h2>
            <ul>
              {createdCommunities.map((community) => (
                <li key={community._id} onClick={() => handleCommunityClick(community, true)}>
                  {community.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {joinedCommunities.length > 0 && (
          <div className="card joined-communities">
            <h2>Joined Communities</h2>
            <ul>
              {joinedCommunities.map((community) => (
                <li key={community._id} onClick={() => handleCommunityClick(community, false)}>
                  {community.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {createdCommunities.length === 0 && <p>No communities created.</p>}
        {joinedCommunities.length === 0 && <p>No communities joined.</p>}
      </div>
    </>
  );
};

export default Community;
