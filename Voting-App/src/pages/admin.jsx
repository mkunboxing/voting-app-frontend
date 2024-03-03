// Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, AppBar, Toolbar } from '@mui/material';
import Navbar from '../components/navbar';

const Admin = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem('Token');

        // If the token is not found, handle the error or redirect to login
        if (!token || isTokenExpired(token)) {
          console.error('Token Not Found or Expired');
          navigate('/user/login');
          // Handle error, redirect to login, or show an error message
          // For example, navigate('/login') to redirect to the login page
          return;
        }

        // Make a GET request to the profile route on the backend
        const response = await axios.get('http://localhost:8000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the response structure has a user field
        setUserData(response.data.user);
        // console.log('User Profile:', response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error.response.data.error);
        // Handle error, redirect, or show an error message
      }
    };

    fetchUserProfile();
  }, []);

  // Utility function to check if a JWT token is expired
  const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    return expirationTime < Date.now();
  };

  const pages = [
    
  ];
  const settings = ['Logout'];

  return (
    <div>
      <Navbar pages={pages} settings={settings} />
      <h2>Admin Dashboard</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Aadhar Number: {userData.aadharNumber}</p>
          <p>Address: {userData.address}</p>
          <p>Age: {userData.age}</p>
          {/* <p>ID: {userData._id}</p> */}
          <p>role: {userData.role}</p>
          {userData.role !== 'admin' && (
            <Button variant="contained" color="primary" component={Link} to="/candidate/list">
              Candidates List
            </Button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Admin;
