import serverApiUrl from "./server.js"
export const performance = async (carId) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/monthly-data'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
               vehicleid: carId
            }),
        });
        console.log("API URL:", serverApiUrl + apiUrl);
         if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();   
        return data;
    }
    catch (error) {
        console.error(error);
    }
};
export const reviews = async (carId) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/getFeedback'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
               carId: carId
            }),
        });
         if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();   
        return data;
    }
    catch (error) {
        console.error(error);
    }
};