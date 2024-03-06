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
} from "@mui/material";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);
      // Make a POST request to backend route
      const response = await axios.post(
        `${backendURL}/user/signup`,
        formData
      );
      const token = response.data.token;

      // Save the token to local storage
      localStorage.setItem("Token", token);

      console.log("Backend response:", response.data);

      // Redirect to the login page after successful submission
      navigate("/user/profile");
    } catch (error) {
      console.error("Error submitting data:", error);
    }finally {
      setLoading(false); // Set loading to false after signup completes (whether success or failure)
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
          <TextField
          sx={{
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                width: 300,
              },
            }}
            label="Half Address"
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
            
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            type="number"
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
            
            label="Aadhar Number"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            type="number"
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
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
            size="small"
            // fullWidth
            style={{ marginBottom: "1rem" }}
          />
          <div>
            {/* <Button type="submit" variant="contained" color="primary">
              Submit
            </Button> */}
            <Button type="submit"  variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default UserForm;
