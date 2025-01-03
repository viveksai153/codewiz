import React, { useState, useEffect } from 'react';
import CommunityService from './CommunityService';
import './joincommunity.css';
import AppBar from '../AppBar';

const JoinCommunity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [communitiesPerPage] = useState(5);
  const [allCommunities, setAllCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await CommunityService.getAllCommunities();
        setAllCommunities(response);
        setFilteredCommunities(response);
      } catch (error) {
        console.error(error.message);
      }
    };

     

    fetchCommunities();
    
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = allCommunities.filter((community) =>
      community.name.toLowerCase().includes(value) ||
      community.description.toLowerCase().includes(value)
    );
    setFilteredCommunities(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleJoinSubmit = async (communityId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await CommunityService.joinCommunity(communityId, token); // Pass the token to joinCommunity

      if (response.message === "User is already a member of this community") {
        alert(response.message); // Alert if the user is already a member
      } else {
        alert('Joined community successfully!');
        console.log(response);
        setJoinedCommunities([...joinedCommunities, response]); // Update joined communities list
      }
    } catch (error) {
      // Assuming the error.message contains the message from the server
      alert(error.message);
      console.error(error.message);
    }
  };

  // Pagination logic
  const indexOfLastCommunity = currentPage * communitiesPerPage;
  const indexOfFirstCommunity = indexOfLastCommunity - communitiesPerPage;
  const currentCommunities = filteredCommunities.slice(indexOfFirstCommunity, indexOfLastCommunity);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <AppBar />
      <div className="join-community-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Communities..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="community-list">
          {currentCommunities.map((community) => (
            <div key={community._id} className="community-card">
              <h3>{community.name}</h3>
              <p>{community.description}</p>
              <button onClick={() => handleJoinSubmit(community._id)} className="join-button">Join Community</button>
            </div>
          ))}
        </div>
        <div className="pagination">
          {[...Array(Math.ceil(filteredCommunities.length / communitiesPerPage)).keys()].map(number => (
            <button key={number} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default JoinCommunity;
