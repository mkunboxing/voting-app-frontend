import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthHandler = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Fetch user data from the server using the stored token
        const token = localStorage.getItem('Token');

        if (token) {
          // Wait for the token to be set before checking the user role
          const response = await axios.get('http://localhost:8000/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Assuming the server response contains a 'role' field
          const userRole = response.data.user.role;

          // Redirect based on the user's role
          if (userRole === 'admin') {
            navigate('/admin'); // Redirect to the admin page if the user is an admin
          } else {
            navigate('/user/profile'); // Redirect to the profile page if the user is not an admin
          }
        } else {
          // Token not found, handle the situation accordingly
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error checking user role:', error.response.data.error);
        // Handle error, e.g., redirect to login or show an error message
      } finally {
        // Set loading to false once the role determination is complete
        setIsLoading(false);
      }
    };

    checkUserRole(); // Invoke the function when the component mounts
  }, [navigate]); // Include navigate as a dependency to avoid React warnings

  // Render a loading screen while the user's role is being determined
  return isLoading ? <div>Loading...</div> : null;
};

export default AuthHandler;
