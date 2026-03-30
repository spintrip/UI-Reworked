import serverApiUrl from "./server.js"


export const getBlogs = async () => {
    
    try {
       
        var apiUrl = 'users/blogs'; // Points to the new public route
        const response = await fetch(serverApiUrl + apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
  };

  export const getBlogById = async (id) => {
    try {
      // Points to the new public route
      const response = await fetch(serverApiUrl + `users/blogs/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw error;
    }
  };