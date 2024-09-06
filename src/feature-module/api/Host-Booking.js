import serverApiUrl from "./server.js"
export const Hostbooking = async () => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/host-bookings'
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
export const bookingRequest = async (bookingId, status) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/booking-request'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                bookingId: bookingId,
                status: status
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


