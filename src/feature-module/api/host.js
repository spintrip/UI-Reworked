import  serverApiUrl  from "./server"

const addNewCar = (carData, callback) => {
    const token = localStorage.getItem('authToken');
    return fetch(serverApiUrl+"host/car", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(carData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (typeof callback === 'function') {
        callback(data);
      }
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
  };

  async function postAdditionCarInfo(carId, carData, postAdditionalCallback) {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(serverApiUrl + "host/carAdditional", {
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


  export { addNewCar, postAdditionCarInfo, };