import axios from 'axios';
const API_BASE_URL = 'http://13.126.174.229:5000';

export const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/autocomplete`, {
        params: { input },
      });
      return response|| [];
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      throw error; // Rethrow the error for handling in the calling component
    }
  };