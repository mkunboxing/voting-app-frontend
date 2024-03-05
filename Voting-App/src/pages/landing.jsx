// LandingPage.jsx

import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import Navbar from "../components/navbar";
import { Card, CardContent, Typography } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenAndRedirect = () => {
      // Get the token from local storage
      const token = localStorage.getItem("Token");

      // If a valid token is found and not expired, redirect to the user profile page
      if (token && !isTokenExpired(token)) {
        navigate("/user/profile");
      }
    };

    checkTokenAndRedirect();
  }, [navigate]);

  // Utility function to check if a JWT token is expired
  const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    return expirationTime < Date.now();
  };
  const pages = [
    { path: "/user/login", label: "Login" },
    { path: "/user/signup", label: "Signup" },
  ];

  return (
    <div>
      <Navbar pages={pages} settings={[]} />

      <h2
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "blue",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        {" "}
        Welcome to India's Online Voting Portal
      </h2>

      <h2
        style={{
          textAlign: "center",
          marginTop: "40px",
          color: "gray",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        {" "}
        Register to Vote
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <Card
          sx={{ minWidth: 150, textAlign: "center", color: "#ef5350", margin: "10px" }}
          component={Link}
          to="/user/signup"
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Register
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 150, textAlign: "center", color: "#ef5350" , margin: "10px"  }}
          component={Link} to="/vote/result">
          <CardContent>
            <Typography variant="h5" component="div">
              Results
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{ minWidth: 150, textAlign: "center", color: "#ef5350", margin: "10px"  }}
          component={Link}
          to="/user/login"
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Login
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
