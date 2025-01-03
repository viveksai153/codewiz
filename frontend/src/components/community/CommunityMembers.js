import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberSidebar from './memberpanel/MemberSidebar';

const CommunityMembers = () => {
  const { communityId } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/communities/community/${communityId}/members`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error.message);
      }
    };
    fetchMembers();
  }, [communityId]);

  return (
    <div className="community-members">
      <h1>Community Members</h1>
      <MemberSidebar/>
      {members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <li key={member._id}>
              <h2>{member.user.name}</h2>
              <p>Email: {member.user.email}</p>
              <p>Role: {member.role}</p>
              <p>Joined: {new Date(member.joinedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No members available</p>
      )}
    </div>
  );
};

export default CommunityMembers;
