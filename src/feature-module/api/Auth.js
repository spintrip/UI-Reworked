// Assuming validateSignup makes an API call and uses the callback with the response
import  serverApiUrl  from "./server"
export async function validateSignup(phone, password, enabled, callback) {
    try {
        let role;
        if (enabled){
            var apiUrl = 'host/signup'
            role = 'host'
        }
        else{
           apiUrl = 'users/signup'
            role = 'user'
        }
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password, role }),
        });

        const data = await response.json();

        // Calling the callback with the entire response object
        callback({ status: response.status, data: data });
    } catch (error) {
        console.error("Error in validateSignup:", error);
        callback({ status: 'error', data: error.message });
        // Consider calling the callback with an error status if needed
    }
}

export async function validateUserOTP   (phone, otp, callback){
    try {
      const response = await fetch(serverApiUrl + 'users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          otp: otp
        })
      });
      const data = await response.json();
      callback({ status: response.status, data: data });
    } catch (error) {
      console.log(error)
    }
  }

 export async function validateusersign (
  phone, password, role, callback
  ) {
    try {
      const route = role ? 'host/login' : 'users/login';
      const response = await fetch(serverApiUrl + route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        })
      });
      const data = await response.json();        
  
      if(data){  
         callback({ status: response.status, data: data });
      }
    } catch (error) {
      console.error(error);
    }
  }
