import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/navbar';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aadharNumber: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {

      setLoading(true); 
      // Make a POST request to the login route on the backend
      const response = await axios.post(`${backendURL}/user/login`, formData);

      // Assuming the response structure has a token field
      const token = response.data.token;

      // Save the token to local storage
      localStorage.setItem('Token', token);

      // Redirect to a protected route or perform other actions
      navigate('/user/profile'); // Replace with the desired route
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      // Handle login failure, show error message, etc.
    }finally {
      setLoading(false); // Set loading to false after login completes (whether success or failure)
    }
  };

  const pages = [
    { path: '/', label: 'Home' },
    { path: '/user/signup', label: 'Signup' },
    
  ];

  return (
    <div>
      <Navbar pages={pages} settings={[]} />
      <h2>Login Page</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Aadhar Number"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        <Button onClick={handleLogin} variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
      <p>
        Don't have an account? <Link to="/user/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
