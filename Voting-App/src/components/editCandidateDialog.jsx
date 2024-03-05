// Import necessary components and libraries
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

const EditCandidateDialog = ({ candidateId, open, onClose }) => {
  const [candidateDetails, setCandidateDetails] = useState({
    name: '',
    party: '',
    // Add other fields as needed
  });
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        // Make a GET request to fetch candidate details
        const response = await axios.get(`${backendURL}/candidate/${candidateId}`);
        setCandidateDetails(response.data);

        // console.log(response.data.response.name);
        setCandidateDetails({
          name: response.data.response.name,
          party: response.data.response.party,
        })

      } catch (error) {
        console.error('Error fetching candidate details:', error.response.data.error);
        // Handle error, redirect, or show an error message
      }
    };

    if (open && candidateId) {
      fetchCandidateDetails();
    }
  }, [open, candidateId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidateDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
        const token = localStorage.getItem('Token');
    // Ensure that the token is available
    if (!token) {
      console.error('Token Not Found');
      return;
    }

    // Make a PUT request to update candidate details
    const response = await axios.put(
      `${backendURL}/candidate/${candidateId}`,
      candidateDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle the response as needed
    console.log('Response:', response.data);

      // Close the dialog after successful update
      onClose();
    } catch (error) {
      console.error('Error updating candidate details:', error.response.data.error);
      // Handle error, show an error message, or redirect
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Candidate Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={candidateDetails.name}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '1rem',marginTop: '1rem'}}
        />
        <TextField
          label="Party"
          name="party"
          value={candidateDetails.party}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        {/* Add other input fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEditSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCandidateDialog;
