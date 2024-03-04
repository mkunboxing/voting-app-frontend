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
        const token = localStorage.getItem('Token');
        if (!token || isTokenExpired(token)) {
          console.error('Token Not Found or Expired');
          navigate('/user/login');
          return;
        }
        const response = await axios.get(`http://localhost:8000/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
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
          {userData.role === 'admin' && (
            <Button variant="contained" color="primary" component={Link} to="/candidate/add">
              Add Candidates
            </Button>
            
          )}
          <Button variant="contained" color="primary" component={Link} to="/candidate/list">
              Candidates List
            </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Admin;
