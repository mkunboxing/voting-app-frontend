// CandidatesList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import VoteButton from '../components/voteButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate, Link } from 'react-router-dom';

const VotingList = () => {
  const [candidates, setCandidates] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Make a GET request to fetch candidates
        const response = await axios.get(`${backendURL}/candidate/list`);
        setCandidates(response.data.response);
      } catch (error) {
        console.error('Error fetching candidates:', error.response.data.error);
        // Handle error, redirect, or show an error message
      }
    };

    fetchCandidates();
  }, []);

  

  const handleVoteClick = async (candidateId) => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('Token');
  
      // Make a POST request to the vote route for the specific candidate
      const response = await axios.post(
        `${backendURL}/candidate/vote/${candidateId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check the response and handle success or failure accordingly
      if (response.status === 200) {
        setAlertSeverity('success');
        setAlertMessage(`Successfully voted for ${candidateId}`);
        showAlert();
  
        // Automatically navigate to the profile section after 2 seconds
        setTimeout(() => {
          navigate('/user/profile');
        }, 2000);
      }else {
        setAlertSeverity('error');
        setAlertMessage(`Failed to vote for ${candidateId}`);
        showAlert();
        // Handle failure, show an error message, or redirect
      }
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage(`Error: ${error.response.data.error}`);
      showAlert();
      // Handle error, show an error message, or redirect
    }
  };
  

  const showAlert = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const pages = [
    { path: '/user/profile', label: 'Profile' },
  ];
  const settings = ['Logout'];

  return (
    <div>
      <Navbar pages={pages} settings={settings} />
      <h2>Voting List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            <strong>Name:</strong> {candidate.name} | <strong>Party:</strong> {candidate.party} |

            {/* Integrate the VoteButton component */}
            <VoteButton candidateName={candidate.name} onVoteClick={() => handleVoteClick(candidate._id)}
            showVoteButton={true} />
          </li>
        ))}
      </ul>

      {/* Alert */}
      <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VotingList;
