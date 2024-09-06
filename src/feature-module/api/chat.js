import axios from 'axios';
import  serverApiUrl  from './server'
const API_URL = serverApiUrl; // Replace with your actual API URL
var token = localStorage.getItem('authToken')


// HOST CHAT
export const getBookings = async () => {
    try {
        const response = await axios.get(`${API_URL}host/host-bookings`, {
            headers: {
                'token': token
            }
        });
        

        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

export const getMessages = async (bookingId) => {
    try {
        const response = await axios.get(`${API_URL}host/chat/${bookingId}`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const sendMessage = async (messageData) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Authentication token is missing');
        }
        const response = await axios.post(`${API_URL}host/chat/send`, messageData, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};



// USER CHAT
export const getUserBookings = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/user-bookings`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
    }
};

export const getUserMessages = async (bookingId) => {
    try {
        const response = await axios.get(`${API_URL}users/chat/${bookingId}`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user messages:', error);
        throw error;
    }
};

export const sendUserMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_URL}users/chat/send`, messageData, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending user message:', error);
        throw error;
    }
};
