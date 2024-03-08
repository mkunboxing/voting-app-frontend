import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Navbar from "../components/navbar";
import { useTheme } from "@mui/material/styles";

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    aadharNumber: "",
    password: "",
    role: "voter",
    isVoted: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if (name === "age" && value > 101) {
    //   return;
    // }
    // const isValidMobileNumber = /^(?:[6-9]\d{0,9})?$/.test(value);

    // // Display a warning if the mobile number is not valid
    // if (name === "mobile" && !isValidMobileNumber) {
    //   alert(
    //     "Please enter a valid mobile number and starting with 6, 7, 8, or 9."
    //   );
    //   return; // Do not update state if the value doesn't match the pattern
    // }

    // const isValidAadharNumber = name === "aadharNumber" && value.length <= 12;

    // // Display a warning if Aadhar Number exceeds the maximum length
    // if (name === "aadharNumber" && !isValidAadharNumber) {
    //   alert("Aadhar Number should not exceed 12 digits.");
    //   return; // Do not update state if the value exceeds the maximum length
    // }

    // const isValidPassword = name === "password" && value.length <= 8;

    // // Display a warning if Password exceeds the maximum length
    // if (name === "password" && !isValidPassword) {
    //   alert("Password should not exceed 8 characters.");
    //   return; // Do not update state if the value exceeds the maximum length
    // }

    // const setShowPassword = () => {
    //   setShowPassword(!showPassword);
    // };
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateMobile = (value) => {
    // Ensure mobile number has exactly 10 digits
    return /^(?:[6-9]\d{0,9})?$/.test(value);
  };
  const validateAadharNumber = (value) => {
    // Ensure Aadhar number has exactly 12 digits
    return /^\d{12}$/.test(value);
  }

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.age > 101) {
      // Age cannot be greater than 101
      setError('Age cannot be greater than 101.');
      return;
    }
    
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      // Mobile number should be 10 digits starting with 6-9
      setError('Enter a valid 10-digit mobile number starting with 6-9.');
      return;
    }
  
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      // Aadhar number should be exactly 12 digits
      setError('Aadhar number must be exactly 12 digits.');
      return;
    }
  
    if (formData.password.length < 8) {
      // Password should be at least 8 characters
      setError('Password must be at least 8 characters.');
      return;
    }
    setError('');
  
    // If all validations pass, proceed with form submission logic
    try {
      setLoading(true);
      // Make a POST request to backend route
      const response = await axios.post(`${backendURL}/user/signup`, formData);
      const token = response.data.token;

      // Save the token to local storage
      localStorage.setItem("Token", token);

      console.log("Backend response:", response.data);

      // Redirect to the login page after successful submission
      navigate("/user/profile");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false); // Set loading to false after signup completes (whether success or failure)
    }
  
    try {
      // Make API request or other form submission logic here
      console.log('Form submitted successfully:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, show an error message, or redirect
    }

   
  };

  const pages = [
    { path: "/", label: "Home" },
    { path: "/user/login", label: "Login" },
  ];
  const theme = useTheme();
  return (
    <div>
      <Navbar pages={pages} settings={[]} />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Signup Page</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: 300,
              },
            }}
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
            size="small"
            // fullWidth
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          />
          <TextField
            sx={{
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: 300,
              },
            }}
            label="Age Max 101"
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            required
            size="small"
            error={formData.age > 101}
            // fullWidth
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          />
          <TextField
            sx={{
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: 300,
              },
            }}
            label="Address (City)"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            size="small"
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          />
          <TextField
            sx={{
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: 300,
              },
            }}
            label="Mobile Number (Start 6, 7, 8, or 9)"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            type="number"
            required
            size="small"
            // inputProps={{ pattern: "[6-9]{1}[0-9]{9}", maxLength: 10 }} // Allow only 10 digits starting with 6-9
            // helperText={
            //   validateMobile(formData.mobile)
            //     ? ""
            //     : "Enter a valid 10-digit mobile number"
            // }
            // error={!validateMobile(formData.mobile)}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          />
          <TextField
            sx={{
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: 300,
              },
            }}
            label="Aadhar Number"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            type="number"
            required
            size="small"
            // inputProps={{ min: 100000000000, max: 999999999999 }}
            // helperText={
            //   validateAadharNumber(formData.aadharNumber)
            //     ? ""
            //     : "Enter a valid 12-digit aadhar number"
            // }
            // error={!validateAadharNumber(formData.aadharNumber)}
            // fullWidth
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          />
          <TextField
            sx={{
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: 300,
              },
            }}
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            required
            size="small"
            // fullWidth
            style={{ marginBottom: "1rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Container>
    </div>
  );
};

export default UserForm;
