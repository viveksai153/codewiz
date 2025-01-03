import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommunityService from '../CommunityService';
import './AdminPanel.css';

const AdminPanel = () => {
  const { communityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(location.state?.community || null);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const apiUrl = `http://localhost:5000/api/admin/${communityId}/members/`;
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    if (!community) {
      const fetchCommunity = async () => {
        try {
          const response = await CommunityService.getCommunityById(communityId);
          setCommunity(response);
        } catch (error) {
          console.error('Error fetching community:', error.message);
        }
      };
      fetchCommunity();
    }
  }, [community, communityId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'auth-token': `${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    if (community) {
      fetchUsers();
    }
  }, [apiUrl, authToken, community]);

  const handleRoleChange = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}${selectedUserId}/role`,
        { role: selectedRole },
        {
          headers: {
            'auth-token': `${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user._id === selectedUserId ? { ...user, role: selectedRole } : user
        )
      );
      console.log('Role updated:', response.data);
      setSelectedRole('');
      setSelectedUserId('');
    } catch (error) {
      console.error('Error updating role:', error.message);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(`${apiUrl}${userId}`, {
        headers: {
          'auth-token': `${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.user._id !== userId));
      console.log('User removed:', userId);
    } catch (error) {
      console.error('Error removing user:', error.message);
    }
  };

  const handleDeleteCommunity = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/communities/${communityId}`, {
        headers: {
          'auth-token': `${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Community deleted');
      navigate('/communitypage'); // Redirect to home page or another page after deletion
    } catch (error) {
      console.error('Error deleting community:', error.message);
    }
  };

  return (
    <div className="admin-panel">
      {community ? (
        <>
          <h1>Admin Panel for {community.name}</h1>
          <div className="community-actions">
            <button className="delete-c-btn" onClick={handleDeleteCommunity}>
              Delete Community
            </button>
          </div>
          <div className="user-management">
            <h2>User Management</h2>
            <ul>
              {users.map((member) => (
                <li key={member.user._id} className="user-item">
                  <span>{member.user.name} ({member.user.email})</span>
                  <select
                    onChange={(e) => {
                      setSelectedUserId(member.user._id);
                      setSelectedRole(e.target.value);
                    }}
                    value={selectedUserId === member.user._id ? selectedRole : member.role}
                  >
                    <option value="member">Member</option>
                    <option value="moderator">Moderator</option>
                    <option value="administrator">Administrator</option>
                  </select>
                  <button className='changerole'
                    onClick={handleRoleChange} 
                    disabled={selectedUserId !== member.user._id}
                  >
                    Change Role
                  </button>
                  <button className='remove-btn' onClick={() => handleRemoveUser(member.user._id)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminPanel;
