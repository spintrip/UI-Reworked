import axios from 'axios';

import serverApiUrl from "./server.js"

export const getTransaction = async () => {
    const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
  try {
    const response = await axios.get(`${serverApiUrl}users/transactions`,{
        headers: {
            'token': token,
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};


