import { useState } from "react";
import UserForm from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LandingPage from "./pages/landing";
import CandidatesList from "./pages/candidatesList";
import Admin from "./pages/admin";
import AuthHandler from "./pages/Authhandler";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/signup" element={<UserForm />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/candidate/list" element={<CandidatesList />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/auth-handler" element={<AuthHandler />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
