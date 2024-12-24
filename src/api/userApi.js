import axios from 'axios';

const API_URL = 'https://randomuser.me/api';

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/?page=1&results=1&seed=abc`);
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
