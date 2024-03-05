import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const VoteResult = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Make a GET request to fetch candidates
        const response = await axios.get(`${backendURL}/candidate/vote/count`);
        setCandidates(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching candidates:",
          error.response?.data?.error || "Unknown error"
        );
        setLoading(false);
        // Handle error, redirect, or show an error message
      }
    };

    fetchCandidates();
  }, [backendURL]);
  
  const pages = [
    { path: '/', label: 'Home' },
  ];

  return (
    <div>
      <Navbar pages={pages} settings={[]} />
      <h2>Vote Result</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        candidates.map((candidate, index) => (
          <div
            key={candidate._id || index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px',
              border: '1px solid black',
              padding: '5px',
            }}
          >
            <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>Name: {candidate.name}</p>
            <p>Votes: {candidate.count}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default VoteResult;
