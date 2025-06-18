// Profile.js
import  serverApiUrl  from "./server";


export const getProfile = async () => {
    try {
        const token = localStorage.getItem('authToken');
        var apiUrl = 'users/profile';
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};
export const putUpdateProfile = async (userId, updateData) => {
    const tk = localStorage.getItem('authToken');  // Ensure you are retrieving the token correctly.
    if (!tk) {
        console.error('No token found');
        return;
    }
    const apiUrl = 'users/profile';  // API endpoint for the PUT request.
    try {
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
            },
            body: JSON.stringify({
                id: userId,
                dlNumber: updateData.dlNumber,
                fullName: updateData.fullName,
                aadharId: updateData.aadharId,
                email: updateData.email,
                address: updateData.address,
                currentAddressVfid: updateData.currentAddressVfid,
                mlData: updateData.mlData
            })
        });
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        return await response.json(); // Parse JSON response.
    } catch (error) {
        console.error('Failed to update profile:', error);
    }
};

export const putVerify = async (formData, callback) => {
    const tk = localStorage.getItem('authToken');  // Ensure you are retrieving the token correctly.
    if (!tk) {
        console.error('No token found');
        return;
    }
    const apiUrl = 'users/verify';  // API endpoint for the PUT request.
    try {
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'PUT',
            headers: {
                'token': tk,
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json(); // Parse JSON response.
        if (callback && typeof callback === 'function') {
            callback(null, data);  // Pass the result to the callback
        }
        return data;
    } catch (error) {
        console.error('Failed to update profile:', error);
        if (callback && typeof callback === 'function') {
            callback(error);  // Pass the error to the callback
        }
    }
};


export const getHostProfile = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found');
        return;
      }
      const apiUrl = 'host/profile';
      const response = await fetch(serverApiUrl + apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token, // Use the token here
        }
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  };
  


  export const putHostUpdateProfile = async (updateData) => {
    const tk = localStorage.getItem('authToken');  // Ensure you are retrieving the token correctly.
    if (!tk) {
        console.error('No token found');
        return;
    }
    const apiUrl = 'host/profile';  // API endpoint for the PUT request.
    try {
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
            },
            body: JSON.stringify({
                fullName: updateData.fullName,
                businessName: updateData.businessName,
                GSTnumber: updateData.GSTnumber,
                PANnumber: updateData.PANnumber,
                aadharId: updateData.aadharId,
                email: updateData.email,
                address: updateData.address,
                onlyVerifiedUsers: updateData.onlyVerifiedUsers
            })
        });
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        return await response.json(); // Parse JSON response.
    } catch (error) {
        console.error('Failed to update Host profile:', error);
    }
};


export const putHostVerify = async(formData) => {

    const tk = localStorage.getItem('authToken');  // Ensure you are retrieving the token correctly.
    if (!tk) {
        console.error('No token found');
        return;
    }
    const apiUrl = 'host/verify';  // API endpoint for the PUT request.
    try {
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'PUT',
            headers: {
                'token': tk
            },
           body: formData
        });
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        return await response.json(); // Parse JSON response.
    } catch (error) {
        console.error('Failed to update profile:', error);
    }
}
