// var token = localStorage.getItem('authToken')
import serverApiUrl from "./server.js"
//import axios from "axios";


export const getCars = async () => {
    
    try{
    //     const token = localStorage.getItem('authToken');
    //     if (!token) {
    //         console.error('No token found');
    //     return;
    // }
        var apiUrl = 'users/cars'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'token':token
            },
            body: JSON.stringify(),

        });
        return response;
    }
    catch (error) {
        console.error(error);
    }
};
export const postOneVehicle = async (vehicleid, startDate, endDate, startTime, endTime) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
        console.error('No token found');
        return;
        }
        var apiUrl = 'users/onevehicle'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                vehicleid: vehicleid,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to check car availability');
        }

        const data = await response.json();
        return data;
    
};
export const findVehicles = async (vehicletype, startDate, endDate, startTime, endTime, latitude, longitude, distance) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'users/findvehicles'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                vehicletype: vehicletype,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                latitude: latitude,
                longitude: longitude,
                distance : distance
            }),
        });
         if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorDetails.message}`);
        }
        const data = await response.json();   
        return data.availableVehicles;
    }
    catch (error) {
        console.error(error);
    }
};

export const postCar = async (carDetails) => {
    const token = localStorage.getItem('authToken');
    try {
        
        if (!token) {
            console.error('No token found');
        return;
        }
        const response = await fetch(serverApiUrl + 'host/car', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(carDetails)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting car:', error);
    }
};
export const postCarAdditionalInfo = async (formData) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        const response = await fetch(serverApiUrl +'host/carAdditional', {
            method: 'PUT',
            headers: {
                
                'token': token
            },
            body: formData
        });

        // Check for a successful response
        if (!response.ok) {
            throw new Error(`Failed to post car additional info: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// api/getuserWishlist.js
export const getuserWishlist = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const apiUrl = 'users/wishlist';
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response; 
    } catch (error) {
        console.error(error);
    }
};

export const postWishlist = async (vehicleid) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
        console.error('No token found');
        return;
        }
        const response = await fetch(serverApiUrl + 'users/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'token': token
            },
            body: JSON.stringify({
                vehicleid : vehicleid,
            }),
        });

        // Check for a successful response
        if (!response.ok) {
            throw new Error(`Failed to post wishlist info: ${response.status}`);
        }
        var data1 = response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const postCancelWishlist = async (vehicleid) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
        console.error('No token found');
        return;
        }
        const response = await fetch(serverApiUrl + 'users/cancelwishlist', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'token': token
            },
            body: JSON.stringify({
                vehicleid : vehicleid,
            }),
        });

        // Check for a successful response
        if (!response.ok) {
            throw new Error(`Failed to cancel wishlist info: ${response.status}`);
        }
        var data1 = response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getVehicleAdditionalInfo = async (data) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
        console.error('No token found');
        return;
        }
        const response = await fetch(serverApiUrl + 'users/getvehicleAdditional', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'token': token
            },
            body: JSON.stringify(data)
        });

        // Check for a successful response
        if (!response.ok) {
            throw new Error(`Failed to post car additional info: ${response.status}`);
        }
        var data1 = response.json();
        return data1;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getAllCarBrands = async () => {
    try {
        const apiUrl = 'host/get-brand';
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch car brands');
        }

        const data = await response.json();
        return data.brands;
    } catch (error) {
        console.error(error);
    }
};

export const viewBreakup = async (vehicleid, startDate, endDate, startTime, endTime) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }
        const apiUrl = 'users/view-breakup';
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify({
                vehicleid: vehicleid,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
            }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorDetails.message}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
