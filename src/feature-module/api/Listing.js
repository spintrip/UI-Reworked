import serverApiUrl from "./server.js"
export const getListing = async () => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/listing'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        });
         if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorDetails.message}`);
        }
        const data = await response.json();   
        return data;
    }
    catch (error) {
        console.error(error);
    }
};

export const updateListing = async (pauseData) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/listing'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(pauseData),
        });
         if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorDetails.message}`);
        }
        const data = await response.json();   
        return data;
    }
    catch (error) {
        console.error(error);
    }
};

export const getTopReviews = async () => {
    try {
      const apiUrl = 'users/top-rating';
      const response = await fetch(serverApiUrl + apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching top reviews:', error);
      return { feedback: [] }; // Return an empty feedback array in case of error
    }
  }
  