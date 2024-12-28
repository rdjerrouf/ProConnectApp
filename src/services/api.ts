import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProfessionals = async () => {
  try {
    const response = await api.get('/professionals');
    return response.data;
  } catch (error) {
    console.error('Error fetching professionals:', error);
    throw error;
  }
};