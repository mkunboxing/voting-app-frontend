// CandidatesList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Make a GET request to fetch candidates
        const response = await axios.get('http://localhost:8000/candidate/list');
        // console.log('Candidates data:', response.data);
        setCandidates(response.data.response);
      } catch (error) {
        console.error('Error fetching candidates:', error.response.data.error);
        // Handle error, redirect, or show an error message
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <h2>Candidates List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            <strong>Name:</strong> {candidate.name} | <strong>Party:</strong> {candidate.party}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;
