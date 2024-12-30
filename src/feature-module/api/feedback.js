import serverApiUrl from "./server.js"
export const postfeedback = async (vehicleid) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'users/getFeedback'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                vehicleid: vehicleid,
            }),
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

export const userRating = async (bookingId, rating, feedback) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const apiUrl = 'users/rating';
      const response = await fetch(serverApiUrl + apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({
          bookingId: bookingId,
          rating: rating,
          feedback: feedback,
        }),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorDetails.message}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };