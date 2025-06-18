import serverApiUrl from "./server.js"
export const postCar = async (carModel, type, brand, chassisNo, rcNumber, engineNumber, registrationYear, address, bodyType) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/car'
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                carModel: carModel, 
                type: type, 
                brand: brand, 
                chassisNo: chassisNo, 
                rcNumber: rcNumber, 
                engineNumber: engineNumber, 
                registrationYear: registrationYear, 
                address: address,
                bodyType: bodyType
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
export const getCarAdditionalInfo = async (carId) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        const response = await fetch(`${serverApiUrl}host/getvehicleAdditional`, {
            method: 'POST',
            headers: { 
                'token': token,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(
              {
                vehicleid: carId,
              }
            )
        });

        // Check for a successful response
        if (!response.ok) {
            throw new Error(`Failed to post car additional info: ${response.status}`);
        }
        var data = response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postCarAdditional = async (formData) => {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
        return;
        }
        var apiUrl = 'host/carAdditional';
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: formData
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