import Axios from 'axios';

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No auth token found");
      return null;
    }

    const config = {
      headers: { 'auth-token': token }
    };

    const response = await Axios.post('http://localhost:5000/api/auth/getuser', {}, config);
    const userData = response.data;
    return userData._id; // Assuming the user ID is stored in the "_id" field
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default fetchUserData;
