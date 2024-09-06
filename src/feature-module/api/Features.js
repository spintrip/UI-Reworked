import axios from 'axios';

import serverApiUrl from "./server.js"

export const getAllFeatures = async () => {
    const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
  try {
    const response = await axios.get(`${serverApiUrl}host/allfeatures`,{
        headers: {
            'token': token
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

export const initializeFeature = async (featureId, carId) => {
    const token = localStorage.getItem('authToken');
        if (!token ) {
            console.error('No token found');
        return;
        }
        if (!carId ) {
            console.error('No car id found');
        
        }
  try {
    await axios.post(`${serverApiUrl}host/features`, {
      featureid: featureId,
      carid: carId,
      price: 0
    },{
        headers: {
            'token': token
        }
    });
  } catch (error) {
    console.error('Error initializing feature:', error);
    throw error;
  }
};

export const updateFeaturePrice = async (featureId, carId, price) => {
    const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
  try {
    await axios.put(`${serverApiUrl}host/features`, {
      featureid: featureId,
      carid: carId,
      price: price
    },{
        headers: {
            'token': token
        }
    });
  } catch (error) {
    console.error('Error updating feature price:', error);
    throw error;
  }
};

export const deleteFeature = async (featureId, carId) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No token found');
    return;
  }
  try {
    await axios.delete(`${serverApiUrl}host/features`, {
      data: {
        featureid: featureId,
        carid: carId
      },
      headers: {
        'token': token
      }
    });
  } catch (error) {
    console.error('Error deleting feature:', error);
    throw error;
  }
};
