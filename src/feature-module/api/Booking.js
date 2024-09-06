import serverApiUrl from "./server";

export const createBooking = async (bookingPayload) => {
  var carId = bookingPayload.carId;
  var startDate = bookingPayload.startDate;
  var endDate = bookingPayload.endDate;
  var startTime = bookingPayload.startTime;
  var endTime = bookingPayload.endTime;
  var features = bookingPayload.features;
  var apiUrl = 'users/booking'

  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        carId: carId,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        features: features
      }),
    });
    if (!response.ok) {
      const errorDetails = await response.json();
      const error = new Error(`HTTP error! Status: ${response.status}, Message: ${errorDetails.message}`);
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createBooking:", error);
    throw error; 
  }
};


export const userBooking = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    const apiUrl = 'users/User-Bookings';
    const response = await fetch(`${serverApiUrl}${apiUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch user bookings:', response.statusText);
      throw new Error('No Booking Found');
    }

    const data = await response.json();
    
    return data.message;
   } catch (error) {
    console.error('An error occurred while fetching user bookings:', error);
    throw error; 
  }
};


export const tripStart = async (bookingId) => {
  const token = localStorage.getItem('authToken');
  var apiUrl = 'users/Trip-Started'

  try {
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        bookingId: bookingId
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in tripStart:", error);
    throw error; // Rethrow to handle it in the calling component
  }
};

export const cancelBooking = async (bookingId) => {
  const token = localStorage.getItem('authToken');
  var apiUrl = 'users/Cancel-Booking'

  try {
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        bookingId: bookingId,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in cancelBooking:", error);
    throw error; // Rethrow to handle it in the calling component
  }
};

export const bookingCompleted = async (bookingId) => {
  const token = localStorage.getItem('authToken');
  var apiUrl = 'users/booking-completed'

  try {
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        bookingId: bookingId
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in completing booking:", error);
    throw error; // Rethrow to handle it in the calling component
  }
};
export const payment = async (bookingId) => {
  const token = localStorage.getItem('authToken');
  var apiUrl = 'users/payment'
  try {
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        bookingId: bookingId
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in rating: ", error);
    throw error; // Rethrow to handle it in the calling component
  }
}
export const phonePePayment = async (bookingId) => {
  const token = localStorage.getItem('authToken');
  var apiUrl = 'users/phonepayment'
  try {
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        bookingId: bookingId
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in rating: ", error);
    throw error; // Rethrow to handle it in the calling component
  }
}

export const rating = async (bookingId, rating, feedback) => {
  const token = localStorage.getItem('authToken');
  var apiUrl = 'users/rating'

  try {
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        bookingId: bookingId,
        rating: rating,
        feedback: feedback
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in rating: ", error);
    throw error; // Rethrow to handle it in the calling component
  }
};


export const extendBooking = async (bookingId , newEndDate, newEndTime) => {
  const token = localStorage.getItem('authToken');
  var apiUrl = 'users/extend-booking'

  try {
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await fetch(serverApiUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        bookingId: bookingId,
        newEndDate: newEndDate,
        newEndTime: newEndTime,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in tripStart:", error);
    throw error; 
  }
};

