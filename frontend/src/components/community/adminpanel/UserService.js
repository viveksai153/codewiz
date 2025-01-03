import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getToken = () => {
  return localStorage.getItem('token');
};

const UserService = {
  getUsers: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getToken(),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  removeUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': getToken(),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  setRole: async (userId, role) => {
    try {
      const response = await axios.put(
        `${API_URL}/${userId}/role`,
        { role },
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
};

export default UserService;
