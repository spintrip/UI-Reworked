import  serverApiUrl  from "./server"

const addNewVehicle = async (vehicleData, callback) => {
    const token = localStorage.getItem('authToken');
    console.log(vehicleData);
    try {
    const response = await fetch(serverApiUrl + "host/vehicle", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(vehicleData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    if (typeof callback === 'function') {
      callback(data);
    }
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
  };

  async function postAdditionVehicleInfo(carId, carData, postAdditionalCallback) {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(serverApiUrl + "host/vehicleAdditional", {
            method: 'PUT',
            headers: {
                'token': token,
            },
            body: carData
        });

        const result = await response.json();
        if (response.ok) {
            postAdditionalCallback(null, result); // Successful response
        } else {
            postAdditionalCallback(new Error(result.message || 'Something went wrong'), null);
        }
    } catch (error) {
        postAdditionalCallback(error, null); // Network or other error
    }
}


  export { addNewVehicle, postAdditionVehicleInfo, };