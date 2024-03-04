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
} from "@mui/material";
import Navbar from "../components/navbar";
import { useTheme } from "@mui/material/styles";

const CandidateAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    age: "",
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Get the token from local storage
      const token = localStorage.getItem('Token');
  
      // Make a POST request to backend route with authorization header
      const response = await axios.post(
       `${backendURL}/candidate/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Redirect to the admin page after successful submission
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error, show an error message, etc.
    }
  };
  

  const pages = [
    { path: '/user/profile', label: 'Profile' },
  ];
  const settings = ['Logout'];
  const theme = useTheme();
  return (
    <div>
      <Navbar pages={pages} settings={settings} />
      <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
            label="Party"
            name="party"
            value={formData.party}
            onChange={handleChange}
            type="text"
            required
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
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            required
            size="small"
            // fullWidth
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          />
          <div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default CandidateAdd;
