import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contents';

const getToken = () => {
  return localStorage.getItem('token');
};

const ContentService = {
  getContents: async () => {
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

  removeContent: async (contentId) => {
    try {
      const response = await axios.delete(`${API_URL}/${contentId}`, {
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
};

export default ContentService;
