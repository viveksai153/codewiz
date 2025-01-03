// CommunityService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/communities';

const getToken = () => {
  return localStorage.getItem('token');
};

const CommunityService = {
  createCommunity: async (name, description) => {
    try {
      const response = await axios.post(
        `${API_URL}`,
        { name, description },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': getToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

   getAllCommunities: async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      };

      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  joinCommunity: async (communityId) => {
    try {
      const response = await axios.post(
        `${API_URL}/${communityId}/join`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': getToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  leaveCommunity: async (communityId) => {
    try {
      const response = await axios.post(
        `${API_URL}/${communityId}/leave`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': getToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },


  getUserCommunities: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user/communities`,
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': getToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },


  getCommunityById: async (communityId) => {
    try {
      const response = await axios.get(`${API_URL}/${communityId}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getToken(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching community by ID:', error.message);
      throw error;
    }
  }


};

export default CommunityService;
